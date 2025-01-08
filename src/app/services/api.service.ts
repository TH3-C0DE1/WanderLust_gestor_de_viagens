
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject } from 'rxjs';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TravelFormModalComponent } from '../travel-form-modal/travel-form-modal.component';

@Injectable({
  providedIn: 'root',
})

export class ApiService 
{
  private apiUrl = 'https://mobile-api-one.vercel.app';
  private name = 'marciopinheiro@ipvc.pt';
  private password = 'L3@wZn2K';

  public travels: any[] = [];     // Define the Travels

  // Define a BehaviorSubject to store the list of travels
  private travelListChanged = new BehaviorSubject<any[]>([]);

  constructor(

    private http: HttpClient,
    private modalController: ModalController,     // Inject ModalController
    private alertController: AlertController,     // Inject AlertController
    private loadingController: LoadingController, // Inject LoadingController
    private toastController: ToastController      // Inject ToastController

  ) {}

    // The getter method for the travelListChanged observable
    getTravelListChanged() {
      return this.travelListChanged.asObservable();
    }

  // GET Headers
  private getHeaders(): HttpHeaders 
  {
    return new HttpHeaders({

      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,

    });
  }

//-------------------------------------------------------------------------------------------
// TRAVELS
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
        await this.presentToast(`Não há Viagens Disponíveis. 😥`, 'warning');
      }

      else 
      {
        await this.presentToast(`Sucesso a Obter ${this.travels.length} Viagens. 🚀`, 'success');
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
  async postTravel(newTravel: any)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      await firstValueFrom(this.http.post(`${this.apiUrl}/api/travels`, newTravel, { headers }));

      loading.dismiss();

      await this.presentToast(`Viagem Criada com Sucesso. 🚀`, 'success');
      await this.getTravels(); // Refresh travels
    } 

    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // PUT Travels (Edit)
  async putTravel(id: string, updatedTravel: any)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      await firstValueFrom(this.http.put(`${this.apiUrl}/api/travels/${id}`, updatedTravel, { headers }));

      loading.dismiss();

      await this.presentToast(`Viagem Atualizada com Sucesso. 🚀`, 'success');
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }
  
   // DEL Travels
  async deleteTravel(id: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/api/travels/${id}`, { headers }));

      loading.dismiss();

      await this.presentToast(`Viagem Apagada com Sucesso. 🚀`, 'success');
      await this.getTravels(); // Refresh travels
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

//-------------------------------------------------------------------------------------------
// TRAVELS COMMENTS
//-------------------------------------------------------------------------------------------

  // GET Comments for a Travel
  async getTravelComments(id: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      // Fetch all travels
      const travels: { id: string; comments: any[] }[] = await firstValueFrom(
        
        this.http.get<any[]>(`${this.apiUrl}/api/travels`, { headers })
      );

      loading.dismiss();

      // Find the specific travel by ID
      const travel = travels.find((travel) => travel.id === id);

      if (!travel) {
        // Travel not found
        await this.presentToast(`Viagem com ID ${id} não encontrada. 😥`, 'warning');
        return [];
      }

      if (travel.comments.length === 0) {
        // No comments available for the travel
        await this.presentToast(`Não há Comentários Disponíveis para esta Viagem. 😥`, 'warning');
      } else {
        // Comments retrieved successfully
        await this.presentToast(`Sucesso a Obter ${travel.comments.length} Comentários. 🚀`, 'success');
      }
      
      return travel.comments;  // Return the Array of Comments
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return [];  // Return an Empty Array in Case of Error
    }
  }

  // POST Travel Notes
  async postTravelComments(travelId: string, comment: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      const body = { travelId, comment }; // Adjusted request body

      await firstValueFrom(this.http.post(`${this.apiUrl}/api/travels/comments`, body, { headers }));

      loading.dismiss();

      await this.presentToast(`Nota Criada com Sucesso. 🚀`, 'success');
    } 

    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // DEL Travels
  async deleteTravelComments(id: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); // Get Headers

    try 
    {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/api/travels/comments/${id}`, { headers }));

      loading.dismiss();

      await this.presentToast(`Nota Apagada com Sucesso. 🚀`, 'success');
      await this.getTravels(); // Refresh travels
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

//-------------------------------------------------------------------------------------------
// EXTRA
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
      duration: 2000,             // Duration of the Toast in milliseconds   
      position: 'top', 
      cssClass: 'toast-top',      // Custom CSS class for top-left positioning
      color: color,

    });

    await toast.present(); // Display Toast Notification
  }

  // Reload Travel
  async reloadTravels() {
    this.travels = await this.getTravels();  // Call your existing getTravels method to reload the list
    this.travelListChanged.next(this.travels);  // Emit the updated travels to any subscribers
  }

  // Open Modal
  async openModal(action: 'POST' | 'PUT' | 'DELETE', travel?: any) {
    if (action === 'DELETE') {
      // Create the alert for DELETE action
      const alert = await this.alertController.create({
        header: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a viagem "${travel?.description}"?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
            }
          },
          {
            text: 'Excluir',
            role: 'destructive',
            handler: async () => {
              await this.deleteTravel(travel.id);
              await this.reloadTravels();
            }
          }
        ]
      });
  
      // Present the alert
      await alert.present();
    } else {
      // Open modal for POST or PUT action
      const modal = await this.modalController.create({
        component: TravelFormModalComponent,
        componentProps: {
          travel: action === 'PUT' ? { ...travel } : {}, // Clone travel for editing
          modalTitle: action === 'POST' ? 'Nova Viagem' : action === 'PUT' ? 'Atualizar Viagem' : 'Excluir Viagem',
          actionType: action // Pass actionType directly
        },
      });
  
      modal.onDidDismiss().then(async (result) => {
        if (result.data) {
          const updatedTravel = result.data;
          switch (action) {
            case 'POST':
              await this.postTravel(updatedTravel);
              await this.reloadTravels();
              break;
            case 'PUT':
              await this.putTravel(travel.id, updatedTravel);
              await this.reloadTravels();
              break;
          }
        }
      });
  
      return modal.present();
    }
  }
  
}