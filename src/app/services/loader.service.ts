// loader.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private loadingController: LoadingController) {}

  async showLoader(message: string = 'Loading...') {
    const loader = await this.loadingController.create({
      message: message,
      spinner: 'crescent', // Customize the spinner if necessary
    });
    await loader.present();
  }

  async hideLoader() {
    await this.loadingController.dismiss();
  }
}
