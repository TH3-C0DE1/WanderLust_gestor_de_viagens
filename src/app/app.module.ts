
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from './services/api.service';

@NgModule({
  
  declarations: [AppComponent],

  imports: 
  [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
  ],
    
  providers: 
  [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 
    provideHttpClient(withInterceptorsFromDi()), 
    ApiService,
  ],

  bootstrap: [AppComponent],
  
})

export class AppModule {}