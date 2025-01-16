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
  @Input() action!: string; // 'create' or 'update'

  constructor(

    private modalController: ModalController,
    private apiService: ApiService,
    private router: Router
    
  ) {}

  ngOnInit() {
    if (this.action === 'update' && this.location) {
      this.location = { ...this.location };
    }
  }

    // Save (Create/Update)
    async saveLocation() {
      if (this.action === 'create') {
        const newLocation = { ...this.location, travelId: this.travelId };
        try {
          const createdLocation = await this.apiService.createLocation(newLocation);
          this.router.navigate([`/tabs/locations`], { queryParams: { travelId: this.travelId } });
          this.modalController.dismiss(createdLocation); // Close modal and return created location
        } catch (error) {
          console.error('Error creating location:', error);
        }
      } else if (this.action === 'update') {
        const updatedLocation = { ...this.location };
        try {
          const updatedLoc = await this.apiService.updateLocation(this.location.id, updatedLocation);
          this.router.navigate([`/tabs/locations`], { queryParams: { travelId: this.travelId } });
          this.modalController.dismiss(updatedLoc); // Close modal and return updated location
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
