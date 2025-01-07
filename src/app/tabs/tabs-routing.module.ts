import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'viagens',
        loadChildren: () => import('../viagens/viagens.module').then(m => m.ViagensPageModule)
      },
      {
        path: 'locais',
        loadChildren: () => import('../locais/locais.module').then(m => m.LocaisPageModule)
      },
      {
        path: 'notifs',
        loadChildren: () => import('../notifs/notifs.module').then(m => m.NotifsPageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../config/config.module').then(m => m.ConfigPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/viagens',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/viagens',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
