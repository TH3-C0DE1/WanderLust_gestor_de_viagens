import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { ApiService } from '../services/api.service';

enum LocationPriority 
{
  Low = 'Low',
  Normal = 'Normal',
  High = 'High',
}

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class LocationModalComponent 
{

  priority = Object.values(LocationPriority);

  @Input() travelId!: string;
  @Input() location: any = {};
  @Input() action!: string;
  @Input() travelStartAt!: string; 
  @Input() travelEndAt!: string; 

  constructor(

    private modalController: ModalController,
    private apiService: ApiService,
    private router: Router
    
  ) {}

  ngOnInit() {
    if (this.action === 'update' && this.location) {
      this.location = { ...this.location }; // Make a copy to avoid direct mutation
    } else if (this.action === 'create') {
      // Initialize location with default values for create action
      this.location = {
        travelId: this.travelId,
        description: '', // Default name
        startAt: this.travelStartAt, // Default start date
        priority: LocationPriority.Normal, // Default priority
        isFav: false, // Default favorite status
      };
    }
  }

  // Save (Create/Update)
  async saveLocation() {
    let locationToSave;
  
    // Basic validation before saving
    if (!this.location.description || !this.location.startAt) {
      console.error('Missing required fields');
      // Show an alert or feedback to the user for missing fields
      return;
    }
  
    if (this.action === 'create') {
      locationToSave = { ...this.location, travelId: this.travelId };
      try {
        const createdLocation = await this.apiService.createLocation(locationToSave);
        this.modalController.dismiss({
          data: createdLocation,
          action: 'create'
        }); // Pass the new location and action type back
      } catch (error) {
        console.error('Error creating location:', error);
      }
    } else if (this.action === 'update') {
      locationToSave = { ...this.location };
      try {
        const updatedLocation = await this.apiService.updateLocation(this.location.id, locationToSave);
        this.modalController.dismiss({
          data: updatedLocation,
          action: 'update'
        }); // Pass the updated location and action type back
      } catch (error) {
        console.error('Error updating location:', error);
      }
    }
  }



  
    // Close the modal without saving
    closeModal() {
      this.modalController.dismiss();
    }    
}
