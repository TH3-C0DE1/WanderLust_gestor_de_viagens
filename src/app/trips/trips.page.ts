
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Import the ApiService

import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TravelCommentsModalComponent } from '../travel-comments-modal/travel-comments-modal.component'; // Import the Comments Modal

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: false,
})

export class TripsPage implements OnInit 
{
  travels: any[] = []; // Array to store the travels data

  constructor(
    
    private apiService: ApiService,
    private datePipe: DatePipe,
    private modalController: ModalController,

  ) {} // Inject the ApiService

  ngOnInit() 
  {
    this.loadTravels(); // Call the method to fetch travels when the component initializes

    // Subscribe to travel list changes
    this.apiService.getTravelListChanged().subscribe((travels) => {
      this.travels = travels;
    });
  }

  // Method to fetch travels
  async loadTravels() 
  {
    this.travels = await this.apiService.getTravels(); // Fetch travels from the service and store them
  }

  // Method to create a new travel
  async postTravel() 
  {
    await this.apiService.openModal('POST'); // Open modal for creating a travel
  }

  // Method to edit a travel
  async putTravel(id: any) 
  {
    await this.apiService.openModal('PUT', id); // Open modal for editing a travel 
  }

  // Method to delete a travel
  async deleteTravel(travel: any) 
  {
    await this.apiService.openModal('DELETE', travel); // Open modal for deleting a travel 
  }  

  // Method to open Comments Modal
  async openCommentsModal(travel: any) 
  {
    const modal = await this.modalController.create({
      component: TravelCommentsModalComponent,
      componentProps: {
        id: travel.id, // Pass the travel ID to the modal
      },
      backdropDismiss: true, // Allow dismissing the modal by clicking outside
    });

    return await modal.present();
  }

}