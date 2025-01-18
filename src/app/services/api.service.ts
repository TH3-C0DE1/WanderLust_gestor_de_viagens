
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

  public travels: any[] = [];    
  public locations: any[] = [];    

  // Define a BehaviorSubject to store the list of travels
  private travelListChanged = new BehaviorSubject<any[]>([]);

  constructor(

    private http: HttpClient,
    private modalController: ModalController,     
    private alertController: AlertController,     
    private loadingController: LoadingController, 
    private toastController: ToastController     

  ) {}

  // Get Travel List Changed
  getTravelListChanged() 
  {
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

    const headers = this.getHeaders();

    try 
    {
      this.travels = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/api/travels`, { headers }));

      loading.dismiss();

      if(this.travels.length == 0) 
      {
        await this.presentToast(`There are no Trips Available. 😥`, 'warning');
      }

      else 
      {
        await this.presentToast(`${this.travels.length} Trips Available. ✈️`, 'success');
      }
      
      return this.travels;
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return []; 
    }
  }

  // POST Travels
  async postTravel(newTravel: any)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders(); 

    try 
    {
      await firstValueFrom(this.http.post(`${this.apiUrl}/api/travels`, newTravel, { headers }));

      loading.dismiss();

      await this.presentToast(`Trip Created Successfully. ✈️`, 'success');
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

    const headers = this.getHeaders();

    try 
    {
      await firstValueFrom(this.http.put(`${this.apiUrl}/api/travels/${id}`, updatedTravel, { headers }));

      loading.dismiss();

      await this.presentToast(`Trip Updated Successfully. ✈️`, 'success');
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

    const headers = this.getHeaders();

    try 
    {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/api/travels/${id}`, { headers }));

      loading.dismiss();

      await this.presentToast(`Trip Deleted Successfully. ✈️`, 'success');
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

    const headers = this.getHeaders();

    try 
    {
      // Fetch all travels
      const travels: { id: string; comments: any[] }[] = await firstValueFrom(
        
        this.http.get<any[]>(`${this.apiUrl}/api/travels`, { headers })
      );

      loading.dismiss();

      // Find the specific travel by ID
      const travel = travels.find((travel) => travel.id === id);

      if (!travel) 
      {
        await this.presentToast(`Trip With ID ${id} Not Found. 😥`, 'warning');
        return [];
      }

      if (travel.comments.length === 0) 
      {
        await this.presentToast(`There Are No Notes Available For This Trip. 😥`, 'warning');
      } 
      
      else 
      {
        await this.presentToast(`${travel.comments.length} Notes Available. 📝`, 'success');
      }
      
      return travel.comments;
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return []; 
    }
  }

  // POST Travel Notes
  async postTravelComments(travelId: string, comment: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try 
    {
      const body = { travelId, comment };

      await firstValueFrom(this.http.post(`${this.apiUrl}/api/travels/comments`, body, { headers }));

      loading.dismiss();

      await this.presentToast(`Note Created Successfully. 📝`, 'success');
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

    const headers = this.getHeaders();

    try 
    {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/api/travels/comments/${id}`, { headers }));

      loading.dismiss();

      await this.presentToast(`Note Deleted Successfully. 📝`, 'success');
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

//-------------------------------------------------------------------------------------------
// TRAVELS LOCATIONS
//-------------------------------------------------------------------------------------------

  // Get Trip Locations
  async getTravelLocations(travelId: string) : Promise<any[]>
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try 
    {
      this.locations = await firstValueFrom(

        this.http.get<any[]>(`${this.apiUrl}/api/travels/${travelId}/locations`, { headers })
      );

      // Sort locations by startAt in ascending order
      this.locations.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  
      loading.dismiss();

      if(this.locations.length == 0) 
      {
        await this.presentToast(`There are no Locations Available. 😥`, 'warning');
      }

      else 
      {
        await this.presentToast(`${this.locations.length} Locations Available. 🌍`, 'success');
      }
      
      return this.locations;
    } 

    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return []; 
    }
  }

  // Get Start and End Dates for a Specific Trip
  async getTravelDates(travelId: string): Promise<{ startAt: string; endAt: string } | null> {
    const loading = await this.showLoading();
    const headers = this.getHeaders();

    try {
      // Fetch all travels
      const travels: { id: string; startAt: string; endAt: string }[] = await firstValueFrom(
        this.http.get<any[]>(`${this.apiUrl}/api/travels`, { headers })
      );

      loading.dismiss();

      // Find the specific travel by ID
      const travel = travels.find((t) => t.id === travelId);

      if (!travel) {
        await this.presentToast(`Trip with ID ${travelId} not found. 😥`, 'warning');
        return null;
      }

      return { startAt: travel.startAt, endAt: travel.endAt };
    } catch (error: any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return null;
    }
  }

  // Add a Location
  async createLocation(location: any) 
  {
    const loading = await this.showLoading();
  
    const headers = this.getHeaders();
  
    try 
    {
      // Ensure the date is properly formatted
      location.startAt = new Date(location.startAt).toISOString();

      // Send the location data to the API, including the travelId in the body
      await firstValueFrom(

        this.http.post<any>(`${this.apiUrl}/api/travels/locations`, location, { headers })
      );
      
      loading.dismiss();

      await this.presentToast(`Location Added Successfully. ✈️`, 'success');
    }     
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // Update a Location
  async updateLocation(locationId: string, updatedLocation: any) 
  {
    const loading = await this.showLoading();
  
    const headers = this.getHeaders();

    try 
    {
      // Ensure the date is properly formatted
      updatedLocation.startAt = new Date(updatedLocation.startAt).toISOString();

      // Send the updated location data to the API for the specific locationId
      await firstValueFrom(

        this.http.put(`${this.apiUrl}/api/travels/locations/${locationId}`, updatedLocation, { headers })
      );
      
      loading.dismiss();

      await this.presentToast(`Location Updated Successfully. ✈️`, 'success');
    }     
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // Delete a Location
  async deleteLocation(locationId: string) 
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try 
    {
      // Send the DELETE request to remove the location
      await firstValueFrom(
        
        this.http.delete(`${this.apiUrl}/api/travels/locations/${locationId}`, { headers })
      );

      loading.dismiss();

      await this.presentToast(`Location Deleted Successfully. ✈️`, 'success');
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // Toggle Favorite
  async toggleFavorite(locationId: string, isFav: boolean) {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try {
      // Send a PATCH request to update the isFav property
      await firstValueFrom(
        this.http.put(`${this.apiUrl}/api/travels/locations/${locationId}`, { isFav }, { headers })
      );

      loading.dismiss();
      await this.presentToast(isFav ? 'Added to Favorites. ❤️' : 'Removed from Favorites. 💔', 'success');
    } catch (error: any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

//-------------------------------------------------------------------------------------------
// LOCATIONS COMMENTS
//-------------------------------------------------------------------------------------------

  // GET Comments for a Location
  async getLocationComments(id: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try 
    {
      // Fetch all location
      const location = await firstValueFrom(
        
        this.http.get<any>(`${this.apiUrl}/api/travels/locations/${id}`, { headers })
      );

      loading.dismiss();

      if (!location) 
      {
        await this.presentToast(`Location With ID ${id} Not Found. 😥`, 'warning');
        return [];
      }

      if (location.comments.length === 0) 
      {
        await this.presentToast(`There Are No Notes Available For This Location. 😥`, 'warning');
      } 
      
      else 
      {
        await this.presentToast(`${location.comments.length} Notes Available. 📝`, 'success');
      }
      
      return location.comments;
    } 
    
    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
      return []; 
    }
  }

  // POST Location Notes
  async postLocationComments(locationId: string, comment: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try 
    {
      const body = { locationId, comment };

      await firstValueFrom(this.http.post(`${this.apiUrl}/api/travels/locations/comments`, body, { headers }));

      loading.dismiss();

      await this.presentToast(`Note Created Successfully. 📝`, 'success');
    } 

    catch (error : any) 
    {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  // DEL Location Notes
  async deleteLocationComments(id: string)
  {
    const loading = await this.showLoading();

    const headers = this.getHeaders();

    try 
    {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/api/travels/locations/comments/${id}`, { headers }));

      loading.dismiss();

      await this.presentToast(`Note Deleted Successfully. 📝`, 'success');
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

      spinner: 'bubbles',
      showBackdrop: true,
      cssClass: 'loaderCSS'
    });

    await loading.present(); 

    return loading;
  }

  // Show Toast Notification
  private async presentToast(message: string, color: 'success' | 'danger' | 'warning') 
  {

    const toast = await this.toastController.create({

      message: message,
      duration: 2000,             // Duration of the Toast in milliseconds   
      position: 'top', 
      cssClass: 'toastCSS',      
      color: color,

    });

    await toast.present();
  }

  // Reload Travel
  async reloadTravels() 
  {
    this.travels = await this.getTravels();  
    this.travelListChanged.next(this.travels); 
  }

  // Open Modal
  async openModal(action: 'POST' | 'PUT' | 'DELETE', travel?: any) {
    if (action === 'DELETE') 
    {
      // Create Alert for DELETE
      const alert = await this.alertController.create({

        header: 'DELETE TRIP',
        message: `Are you sure you want to DELETE the trip "${travel?.description}"?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Canceled');
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: async () => {
              await this.deleteTravel(travel.id);
              await this.reloadTravels();
            }
          }
        ]
      });
  
      await alert.present();
    } 
    
    else 
    {
      // Open modal for POST or PUT
      const modal = await this.modalController.create({
        component: TravelFormModalComponent,
        componentProps: {
          travel: action === 'PUT' ? { ...travel } : {},
          modalTitle: action === 'POST' ? 'NEW TRIP' : action === 'PUT' ? 'UPDATE TRIP' : 'DELETE TRIP',
          actionType: action
        },
      });
  
      modal.onDidDismiss().then(async (result) => 
      {
        if (result.data) 
        {
          const updatedTravel = result.data;

          switch (action) 
          {
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