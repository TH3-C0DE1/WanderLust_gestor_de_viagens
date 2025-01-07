
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class ApiService 
{
  private apiUrl = 'https://mobile-api-one.vercel.app';
  private name = 'marciopinheiro@ipvc.pt';
  private password = 'L3@wZn2K';

  public travels: any[] = []; // Define the Travels

  constructor(

    private http: HttpClient,
    private modalController: ModalController,     // Inject ModalController
    private alertController: AlertController,     // Inject AlertController
    private loadingController: LoadingController, // Inject LoadingController
    private toastController: ToastController      // Inject ToastController

  ) {}

  // GET Headers
  private getHeaders(): HttpHeaders 
  {
    return new HttpHeaders({

      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,

    });
  }

//-------------------------------------------------------------------------------------------

  // GET Travels
  async getTravels(): Promise<any[]> 
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      this.travels = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/api/travels`, { headers }));

      loading.dismiss();

      if(this.travels.length == 0) 
      {
        await this.presentToast(`There is no Travels Available 😥`, 'warning');
      }

      else 
      {
        await this.presentToast(`Success Getting ${this.travels.length} Travels 🚀`, 'success');
      }
      
      return this.travels;  // Make sure the Array of Travels is Returned
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return [];  // Return an Empty Array in Case of Error
    }
  }

  // POST Travels
  async postTravels() 
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    var newTravel = 
    {
      description: "Nova Viagem...",
      type:"Tipo (Lazer, Trabalho, etc.)",
      state:"Estado (Em Estudo, Agendada, etc.)",
      startAt: "Data de Início da Viagem.",
      endAt: "Data do Fim da Viagem.",
    }

    try 
    {
      await firstValueFrom(this.http.post(`${this.apiUrl}/api/travels`, newTravel , { headers }));

      loading.dismiss();

      await this.presentToast(`Travel Successfully Created 🚀`, 'success');
    } 

    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // PUT Travels (Edit)
  async putTravels() 
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    var id = '29747a7e-1a69-4570-811f-2c5916c33719'

    var updatedTravels = 
    {
      prop1:"Título",
      description: "Nova Viagem...",
      type:"Tipo (Lazer, Trabalho, etc.)",
      state:"Estado (Em Estudo, Agendada, etc.)",
      startAt: "Data de Início da Viagem.",
      endAt: "Data do Fim da Viagem.",
    }

    try 
    {
      await firstValueFrom(this.http.put(`${this.apiUrl}/api/travels/${id}`, updatedTravels , { headers }));

      loading.dismiss();

      await this.presentToast(`Travel Successfully Updated 🚀`, 'success');
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }
  
   // DEL Travels
  async deleteTravels() 
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    var id = '29747a7e-1a69-4570-811f-2c5916c33719'

    try 
    {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/api/travels/${id}`, { headers }));

      loading.dismiss();

      await this.presentToast(`Note Successfully Deleted 🚀`, 'success');
      
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

//-------------------------------------------------------------------------------------------

  // Show Loading Spinner
  private async showLoading() 
  {

    const loading = await this.loadingController.create({

      message: 'Loading...',
      spinner: 'crescent',
      showBackdrop: true,

    });

    await loading.present(); // Display Loading Spinner

    return loading; // Return Loading
  }

  // Show Toast Notification
  private async presentToast(message: string, color: 'success' | 'danger' | 'warning') 
  {

    const toast = await this.toastController.create({

      message: message,
      duration: 2000,     // Duration of the Toast in milliseconds
      color: color,     
      position: 'middle',

    });

    await toast.present(); // Display Toast Notification
  }
}