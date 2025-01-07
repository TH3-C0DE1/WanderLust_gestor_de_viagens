import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViagensPage } from './viagens.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ViagensPageRoutingModule } from './viagens-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ViagensPageRoutingModule
  ],
  declarations: [ViagensPage]
})
export class ViagensPageModule {}
