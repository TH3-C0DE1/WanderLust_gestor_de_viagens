import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDetailsPageRoutingModule } from './travel-details-routing.module';

import { TravelDetailsPage } from './travel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDetailsPageRoutingModule
  ],
  declarations: [TravelDetailsPage]
})
export class TravelDetailsPageModule {}
