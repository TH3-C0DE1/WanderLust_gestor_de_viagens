
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViagensPage } from './viagens.page';
import { ViagensPageRoutingModule } from './viagens-routing.module';
import { TravelFormModalComponent } from '../travel-form-modal/travel-form-modal.component'; // Import the modal component

@NgModule({

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ViagensPageRoutingModule,
    TravelFormModalComponent, // Declare the modal component
  ],

  declarations: 
  [
    ViagensPage,
  ],
  
})
export class ViagensPageModule {}
