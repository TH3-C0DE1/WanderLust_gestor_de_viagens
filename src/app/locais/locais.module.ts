import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocaisPage } from './locais.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LocaisPageRoutingModule } from './locais-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LocaisPageRoutingModule
  ],
  declarations: [LocaisPage]
})
export class LocaisPageModule {}
