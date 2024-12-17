import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { firstValueFrom } from 'rxjs';


import { addIcons } from 'ionicons';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
      showBackdrop: true
    });

    loading.present();

    return loading;
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: "bottom",
      color: color
    });

    await toast.present();
  }

  

}
