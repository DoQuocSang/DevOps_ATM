import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapInnerPageRoutingModule } from './map-inner-routing.module';

import { MapInnerPage } from './map-inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapInnerPageRoutingModule
  ],
  declarations: [MapInnerPage]
})
export class MapInnerPageModule {}
