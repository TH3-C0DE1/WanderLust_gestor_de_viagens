import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IonContent, ModalController, AlertController } from '@ionic/angular';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { LocationCommentsModalComponent } from '../location-comments-modal/location-comments-modal.component';

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
  travelStartAt!: string; // Add this property
  travelEndAt!: string;   // Add this property


  getPriorityClass(priority: string): string {
    switch (priority) {
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
    // Get the travelId from the route parameters
    this.activatedRoute.queryParams.subscribe((params) => {
      this.travelId = params['travelId'];
      this.fetchLocations(); // Fetch locations once travelId is available
    });
  }

  // Fetch locations for the given travelId
  async fetchLocations() 
  {
    try {
      // Fetch travel dates
      const travelDates = await this.apiService.getTravelDates(this.travelId);

      if (travelDates) {
        this.travelStartAt = travelDates.startAt; // Assign start date
        this.travelEndAt = travelDates.endAt;     // Assign end date
      }

      const locations = await this.apiService.getTravelLocations(this.travelId);

    // Sort locations: Favorites first, then by startAt
    this.locations = locations.sort((a, b) => {
      if (a.isFav === b.isFav) {
        return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
      }
      return b.isFav - a.isFav; // `true` (1) comes before `false` (0)
    });

  } catch (error) {
    console.error('Error fetching locations', error);
  }
  }

  // Create a new location
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
      if (result.data) {
        this.locations.push(result.data); // Add the new location to the list if a location was created
      }
    });

    return await modal.present();
  }

  // Update a location
  async updateLocation(locationId: string) {
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
        
      }, // Pass location data and action type (update)
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const index = this.locations.findIndex(loc => loc.id === locationId);

        if (index !== -1) {
          this.locations[index] = result.data; // Update the location in the array
        }
      }
    });
    
    return await modal.present();
  }

  // Delete a location
  async deleteLocation(locationId: string) {
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
            try {
              await this.apiService.deleteLocation(locationId); // Delete the location
              this.locations = this.locations.filter(loc => loc.id !== locationId); // Remove from list
              console.log('Location deleted:', locationId);
            } catch (error) {
              console.error('Error deleting location:', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Open Comments Modal
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

  async toggleFavorite(location: any) {
    const updatedFavStatus = !location.isFav;
  
    try {
      await this.apiService.toggleFavorite(location.id, updatedFavStatus);
      location.isFav = updatedFavStatus; // Update the local state
      this.fetchLocations(); // Re-fetch locations to maintain order
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }
}
