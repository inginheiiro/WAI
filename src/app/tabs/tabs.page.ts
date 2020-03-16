import { Component } from '@angular/core';
import {Plugins} from '@capacitor/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

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

}
