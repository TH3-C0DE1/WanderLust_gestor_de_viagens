
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { ModalController } from '@ionic/angular';
import { TravelCommentsModalComponent } from '../travel-comments-modal/travel-comments-modal.component';
import { Router } from '@angular/router';

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
    private router: Router,

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

  // Fetch Locations for a Travel
  async openLocationsPage(travelId: string) {
    const locations = await this.apiService.getTravelLocations(travelId);

    // Always navigate to Locations Page with locations as a query parameter
    this.router.navigate(['/tabs/locations'], {
      queryParams: { travelId, locations: JSON.stringify(locations) }
    });
  }

}