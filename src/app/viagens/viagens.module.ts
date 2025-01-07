import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViagensPage } from './viagens.page';
import { ViagensPageRoutingModule } from './viagens-routing.module';

@NgModule({

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ViagensPageRoutingModule,
  ],

  declarations: [ViagensPage],
})
export class ViagensPageModule {}
