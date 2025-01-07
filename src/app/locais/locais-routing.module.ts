import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocaisPage } from './locais.page';

const routes: Routes = [
  {
    path: '',
    component: LocaisPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocaisPageRoutingModule {}
