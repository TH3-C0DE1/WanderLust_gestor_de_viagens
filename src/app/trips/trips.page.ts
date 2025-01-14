
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { ModalController } from '@ionic/angular';
import { TravelCommentsModalComponent } from '../travel-comments-modal/travel-comments-modal.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: false,
})

export class TripsPage implements OnInit 
{
  travels: any[] = [];

  constructor(
    
    private apiService: ApiService,
    private modalController: ModalController,

  ) {}

  ngOnInit() 
  {
    this.loadTravels(); // Call Fetch Travels

    this.apiService.getTravelListChanged().subscribe((travels) => 
    {
      this.travels = travels;
    });
  }

  // Fetch Travels
  async loadTravels() 
  {
    this.travels = await this.apiService.getTravels();
  }

  // Create New Travel
  async postTravel() 
  {
    await this.apiService.openModal('POST');
  }

  // Edit Travel
  async putTravel(id: any) 
  {
    await this.apiService.openModal('PUT', id);
  }

  // Delete Travel
  async deleteTravel(travel: any) 
  {
    await this.apiService.openModal('DELETE', travel);
  }  

  // Open Comments Modal
  async openCommentsModal(travel: any) 
  {
    const modal = await this.modalController.create({

      component: TravelCommentsModalComponent,

      componentProps: 
      {
        id: travel.id, 
      },
      backdropDismiss: true,
    });

    return await modal.present();
  }
}