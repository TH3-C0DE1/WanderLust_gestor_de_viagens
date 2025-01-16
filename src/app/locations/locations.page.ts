import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalController, AlertController } from '@ionic/angular';
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
  travelId!: string;
  locations: any[] = [];


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
  async fetchLocations() {
    try {
      const locations = await this.apiService.getTravelLocations(this.travelId);
      this.locations = locations;
    } catch (error) {
      console.error('Error fetching locations', error);
    }
  }

  // Create a new location
  async createLocation() {
    const modal = await this.modalController.create({
      component: LocationModalComponent,
      componentProps: { travelId: this.travelId, action: 'create' },  // Pass travelId and action type (create)
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
      componentProps: { travelId: this.travelId, location: locationToUpdate, action: 'update' }, // Pass location data and action type (update)
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
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this location?',
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
}
