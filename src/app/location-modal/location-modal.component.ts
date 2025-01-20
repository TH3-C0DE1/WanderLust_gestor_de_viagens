
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

  imports: 
  [
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
    private alertController: AlertController,
    private apiService: ApiService,
    private router: Router
    
  ) {}

  ngOnInit() 
  {
    if (this.action === 'update' && this.location) 
    {
      this.location = { ...this.location };
    } 
    
    else if (this.action === 'create') 
    {
      this.location = {

        travelId: this.travelId,
        description: '', 
        startAt: this.travelStartAt, 
        priority: LocationPriority.Normal, 
        isFav: false,
      };
    }
  }

  // Create / Update Location
  async saveLocation() 
  {
    let locationToSave;
  
    // Validation Alert For Empty Name
    if (!this.location.description || this.location.description.trim().length === 0) 
    {
      const alert = await this.alertController.create({

        header: 'Invalid Location Name',
        message: 'Name cannot be Empty.',
        buttons: ['OK'],
      });

      await alert.present();
      return; 
    }
  
    if (this.action === 'create') 
    {
      locationToSave = { ...this.location, travelId: this.travelId };

      try 
      {
        const createdLocation = await this.apiService.createLocation(locationToSave);

        this.modalController.dismiss({

          data: createdLocation,
          action: 'create'
        });
      } 
      
      catch (error) 
      {
        console.error('Error Creating Location.', error);
      }
    } 
    
    else if (this.action === 'update') 
    {
      locationToSave = { ...this.location };

      try 
      {
        const updatedLocation = await this.apiService.updateLocation(this.location.id, locationToSave);

        this.modalController.dismiss({

          data: updatedLocation,
          action: 'update'
        });
      } 
      
      catch (error) 
      {
        console.error('Error Updating Location.', error);
      }
    }
  }

  // Close Modal
  closeModal() 
  {
    this.modalController.dismiss();
  }    
}