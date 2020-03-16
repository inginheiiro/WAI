import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ToastController} from '@ionic/angular';
import {DeviceAccounts} from '@ionic-native/device-accounts';

const {Device} = Plugins;


@Component({
    selector: 'app-map',
    templateUrl: 'map.page.html',
    styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
    lat: number;
    lng: number;
    address: string;

    constructor(
        private http: HttpClient,
        public toastController: ToastController
    ) {
    }

    async ngOnInit() {
        // call get current location function on initializing
        this.getCurrentLocation();
        const info = await Device.getInfo();
        await this.presentToast(info.uuid);

    }

    async googleLogin() {
        Plugins.OAuth2Client.authenticate({
            appId: environment.oauthAppId,
            authorizationBaseUrl: 'https://accounts.google.com/o/oauth2/auth',
            accessTokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
            scope: 'email profile',
            resourceUrl: 'https://www.googleapis.com/userinfo/v2/me',
            web: {
                redirectUrl: 'http://localhost:4200',
                windowOptions: 'height=600,left=0,top=0'
            }
        }).then(resourceUrlResponse => {
            // do sth e.g. check with your backend

            console.log(resourceUrlResponse);


        }).catch(reason => {
            console.error('Google OAuth rejected', reason);
        });
    }

    // Function to get the current geo position of the device

    getCurrentLocation() {

        Plugins.Geolocation.getCurrentPosition({enableHighAccuracy: true, maximumAge: 3600}).then(result => {
            this.lat = result.coords.latitude;
            this.lng = result.coords.longitude;

            console.log(Device.getInfo());


            // calling getAddress function to decode the address

            this.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
                this.address = decodedAddress;
                console.log(this.address);
            });
        });
    }


    // This function makes an http call to google api to decode the cordinates

    private getAddress(lat: number, lan: number) {
        return this.http
            .get<any>(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
                    environment.googleMapsAPIKey
                }`
            )
            .pipe(
                map(geoData => {
                    if (!geoData || !geoData.results || geoData.results === 0) {
                        return null;
                    }
                    return geoData.results[0].formatted_address;
                })
            );
    }

    // function to display the toast with location and dismiss button

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message || this.address,

            position: 'middle',
            buttons: [
                {
                    icon: 'close-circle',
                    role: 'cancel'
                }
            ]
        });
        toast.present();
    }

    // click function to display a toast message with the address

    async onMarkerClick() {
        await this.presentToast(null);
    }
}
