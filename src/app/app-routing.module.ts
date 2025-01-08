
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'travel-details',
    loadChildren: () => import('./travel-details/travel-details.module').then( m => m.TravelDetailsPageModule)
  },

  { path: 'viagens', 
    loadChildren: () => import('./viagens/viagens.module').then(m => m.ViagensPageModule) 
  },

];

@NgModule({

  imports: 
  [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],

  exports: [RouterModule]
})

export class AppRoutingModule {}