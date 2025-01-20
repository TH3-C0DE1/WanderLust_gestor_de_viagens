
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

enum TravelType 
{
  Leisure = 'Leisure',
  Business = 'Business',
  Family = 'Family',
  Educational = 'Educational',
  Event =  'Event',
  Volunteer = 'Volunteer',
  RoadTrip = 'Road Trip',
  Shopping = 'Shopping',
  Beach = 'Beach',
  Mountain = 'Mountain',
  Cruise = 'Cruise',
  Safari = 'Safari',
  Expedition = 'Expedition',
}

enum TravelState 
{
  Planned = 'Planned',
  Scheduled = 'Scheduled',
  Postponed = 'Postponed',
  Completed = 'Completed',
  Cancelled = 'Cancelled', 
}

enum TravelCompanion 
{
  Alone = 'Alone',
  Companion = 'With Company',
  Group  = 'In Group',
  Family  = 'In Family',
}

@Component({

  standalone: true,
  selector: 'app-travel-form-modal',
  templateUrl: './travel-form-modal.component.html',
  styleUrls: ['./travel-form-modal.component.scss'],

  imports: 
  [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})

export class TravelFormModalComponent 
{
  travelTypes = Object.values(TravelType);
  travelStates = Object.values(TravelState);
  travelComp = Object.values(TravelCompanion);

  @Input() travel: any = {};        
  @Input() modalTitle: string = ''; 
  @Input() actionType: 'POST' | 'PUT' | 'DELETE' = 'POST';

  constructor(

    private modalController: ModalController,
    private alertController: AlertController,

  ) {}

  // Form Submission Validation
  async submitForm() 
  {
    if (this.actionType === 'POST' || this.actionType === 'PUT') 
    {
      // Validation Alert For Date Order
      if (this.travel.endAt && this.travel.startAt && new Date(this.travel.endAt) < new Date(this.travel.startAt)) 
      {
        const alert = await this.alertController.create({

          header: 'Invalid Date Order',
          message: 'End Date cannot be before Start Date.',
          buttons: ['OK'],
        });

        await alert.present();
        return;
      }
      
      // Validation Alert For Empty Title
      if (!this.travel.description || this.travel.description.trim().length === 0) 
      {
        const alert = await this.alertController.create({

          header: 'Invalid Trip Title',
          message: 'Title cannot be Empty.',
          buttons: ['OK'],
        });

        await alert.present();
        return; 
      }

      this.modalController.dismiss(this.travel);
    }
  }

  // Confirm Delete
  confirmDelete() 
  {
    if (this.actionType === 'DELETE') 
    {
      this.modalController.dismiss(true);
    }
  }

  // Dismiss Modal
  dismiss() 
  {
    this.modalController.dismiss(); 
  }
}