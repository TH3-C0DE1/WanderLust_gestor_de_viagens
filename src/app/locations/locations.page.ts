
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController, AlertController } from '@ionic/angular';

import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationCommentsModalComponent } from '../location-comments-modal/location-comments-modal.component';

import { ApiService } from '../services/api.service';

enum LocationPriority {
  Low = 'Low',
  Normal = 'Normal',
  High = 'High',
}

@Component({

  selector: 'app-locations',
  templateUrl: 'locations.page.html', 
  styleUrls: ['locations.page.scss'],
  standalone: false,

})

export class LocationsPage implements OnInit 
{
  @ViewChild(IonContent) content!: IonContent;

  travelId!: string;
  locations: any[] = [];
  travelStartAt!: string;
  travelEndAt!: string;

  // Get Priority Respective CSS Class 
  getPriorityClass(priority: string): string 
  {
    switch (priority) 
    {
      case LocationPriority.Low:
        return 'low-priority';
      case LocationPriority.Normal:
        return 'normal-priority';
      case LocationPriority.High:
        return 'high-priority';
      default:
        return '';
    }
  }

  constructor(

    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private modalController: ModalController,
    private alertController: AlertController

  ) {}

  ngOnInit() 
  {
    this.activatedRoute.queryParams.subscribe((params) => {

      this.travelId = params['travelId'];
      this.fetchLocations();
    });
  }

  // Fetch Locations -> Trip
  async fetchLocations() 
  {
    try 
    {
      const travelDates = await this.apiService.getTravelDates(this.travelId);

      if (travelDates) 
      {
        this.travelStartAt = travelDates.startAt;
        this.travelEndAt = travelDates.endAt;
      }

      const locations = await this.apiService.getTravelLocations(this.travelId);

      this.locations = locations.sort((a, b) => {

        if (a.isFav === b.isFav) 
        {
          return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
        }

        return b.isFav - a.isFav;
      });
    } 
    
    catch (error) 
    {
      console.error('Error Fetching Locations.', error);
    }
  }

  // Create New Location
  async createLocation() 
  {
    const modal = await this.modalController.create({

      component: LocationModalComponent,
      componentProps: 
      { 
        travelId: this.travelId,
        action: 'create',
        travelStartAt: this.travelStartAt,
        travelEndAt: this.travelEndAt,
      },
    });

    modal.onDidDismiss().then((result) => {

      this.handleModalDismiss(result);
    });

    return await modal.present();
  }

  // Edit Location
  async updateLocation(locationId: string) 
  {
    const locationToUpdate = this.locations.find(loc => loc.id === locationId);

    const modal = await this.modalController.create({

      component: LocationModalComponent,
      componentProps: 
      { 
        travelId: this.travelId, 
        location: locationToUpdate, 
        action: 'update',
        travelStartAt: this.travelStartAt,
        travelEndAt: this.travelEndAt,
        
      },
    });

    modal.onDidDismiss().then((result) => {

      this.handleModalDismiss(result);
    });
    
    return await modal.present();
  }

  // Delete Location
  async deleteLocation(locationId: string) 
  {
    const alert = await this.alertController.create({

      header: 'DELETE LOCATION',
      message: 'Are you sure you want to DELETE the Location?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },

        {
          text: 'Delete',
          handler: async () => {
            try 
            {
              await this.apiService.deleteLocation(locationId);
              this.locations = this.locations.filter(loc => loc.id !== locationId); 
            } 
            
            catch (error) 
            {
              console.error('Error Deleting Location.', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Open Note Modal
  async openLocCommentsModal(location: any) 
  {
    const modal = await this.modalController.create({

      component: LocationCommentsModalComponent,
      componentProps: 
      {
        id: location.id, 
      },

      backdropDismiss: true,
    });

    return await modal.present();
  }

  // Toggle Location Fav
  async toggleFavorite(location: any) 
  {
    const updatedFavStatus = !location.isFav;
  
    try 
    {
      await this.apiService.toggleFavorite(location.id, updatedFavStatus);
      location.isFav = updatedFavStatus;
      this.fetchLocations();
    } 
    
    catch (error) 
    {
      console.error('Error Toggling Favorite.', error);
    }
  }

  // Handle Modal Dismiss (Create / Update)
  handleModalDismiss(result: any) 
  {
    if (result.data) 
    {
      const action = result.data.action; 

      if (action === 'create') 
      {
        this.locations.push(result.data.location);

        this.locations.sort((a, b) => {

          if (a.isFav === b.isFav) 
          {
            return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
          }

          return b.isFav - a.isFav;
        });

        this.fetchLocations();

      } 
      
      else if (action === 'update') 
      {
        const updatedLocation = result.data.location;

        const index = this.locations.findIndex((loc) => loc.id === updatedLocation.id);

        if (index !== -1) 
        {
          this.locations[index] = updatedLocation;
          
          this.locations.sort((a, b) => {

            if (a.isFav === b.isFav) 
            {
              return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
            }

            return b.isFav - a.isFav;
          });
        }
      }
    }
  }

  // Open Location Modal
  async openLocationModal(action: string, location?: any) 
  {
    const modal = await this.modalController.create({

      component: LocationModalComponent,
      componentProps: { action, location }
    });

    modal.onDidDismiss().then((result) => {
      
      this.handleModalDismiss(result);
    });

    await modal.present();
  }

  // Scroll To Top
  scrollToTop() 
  {
    this.content.scrollToTop(500);
  }
}