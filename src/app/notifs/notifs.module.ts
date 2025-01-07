import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifsPage } from './notifs.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NotifsPageRoutingModule } from './notifs-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NotifsPageRoutingModule
  ],
  declarations: [NotifsPage]
})
export class NotifsPageModule {}
