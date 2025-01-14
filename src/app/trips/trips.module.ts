
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TripsPage } from './trips.page';
import { TripsPageRoutingModule } from './trips-routing.module';
import { TravelFormModalComponent } from '../travel-form-modal/travel-form-modal.component'; // Import the modal component
import { TravelCommentsModalComponent } from '../travel-comments-modal/travel-comments-modal.component'; // Import the component


@NgModule({

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripsPageRoutingModule,
    TravelFormModalComponent,
    TravelCommentsModalComponent  ],

  declarations: 
  [
    TripsPage,
  ],
  
})

export class TripsPageModule {}