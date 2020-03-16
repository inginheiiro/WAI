import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MapPage} from './map.page';

import {AgmCoreModule} from '@agm/core';

import {environment} from '../../environments/environment';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: MapPage}]),
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsAPIKey
        })
    ],
    declarations: [MapPage]
})
export class MapPageModule {
}
