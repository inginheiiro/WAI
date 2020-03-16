import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeolocationPosition, Plugins} from '@capacitor/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {OAuth2Client} from '@byteowls/capacitor-oauth2';
import {registerWebPlugin} from '@capacitor/core';
import Stack from 'ts-data.stack';
import {getDistance} from 'geolib';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    private stack = new Stack<GeolocationPosition>();

    private watch: string;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }


    initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit(): void {
        registerWebPlugin(OAuth2Client);
        this.startTracking();
    }

    ngOnDestroy(): void {
        this.stopTracking();
    }

    storeLocation(value: GeolocationPosition): void {

        if (this.stack.count() === 0 || value !== this.stack.peek()) {

            let distance = 1000000;
            if (this.stack.count() > 0) {
                distance = getDistance(
                    {latitude: value.coords.latitude, longitude: value.coords.longitude},
                    {latitude: this.stack.peek().coords.latitude, longitude: this.stack.peek().coords.longitude}
                );
            }

            if (distance > environment.safeDistance) {
                this.stack.push(value);
                console.log(value);

                // Push data to Server ....
                // We can batch push if we use the Storage.
                
                Plugins.Storage.set({
                    key: value.timestamp.toString(),
                    value: JSON.stringify(value)
                }).then();
            }


        }


    }

    startTracking(): void {
        this.watch = Plugins.Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
            if (position) {
                this.storeLocation(position);
            }
        });
    }

    stopTracking(): void {
        Plugins.Geolocation.clearWatch({id: this.watch}).then(() => {
        });
    }


}
