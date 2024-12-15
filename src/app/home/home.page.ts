import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
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

interface note {
  id: String,
  description: String,
  state: State,
  priority: Priority,
  createdBy: String,
  createdAt: Date
  updatedBy: String,
  updatedAt: Date
}

enum State {
  TODO = 'TODO',
  DONE = 'DONE',
}

enum Priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  CRITICAL = "CRITICAL",
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  notes: note[] = [];

  constructor(private http: HttpClient,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController) {}

  apiUrl: string = "https://mobile-api-one.vercel.app/api/notes";

  name: string = "<<marciopinheiro@ipvc.pt>>";

  password: string = "<<L3@wZn2K>>";

  addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

  async getNotes() {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    try {
      this.notes = await firstValueFrom(this.http.get<note[]>(`${this.apiUrl}/notes`, { headers }));
      loading.dismiss();
      if(this.notes.length == 0) {
        await this.presentToast(`There is no notes available 😥`, 'warning');
      }
      else {
        await this.presentToast(`Success getting ${this.notes.length} notes 🚀`, 'success');
      }
      
    } catch (error : any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

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
