
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'signup',
    loadChildren: () => import('./profile/signup/signup.module').then( m => m.SignupPageModule)
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