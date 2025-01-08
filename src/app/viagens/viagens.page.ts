import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Import the ApiService

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.page.html',
  styleUrls: ['./viagens.page.scss'],
  standalone: false,
})

export class ViagensPage implements OnInit 
{
  travels: any[] = []; // Array to store the travels data

  constructor(
    
    private apiService: ApiService,
    private datePipe: DatePipe,

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
    console.log('Opening modal for creating travel');
    await this.apiService.openModal('POST'); // Open modal for creating a travel
    
  }

  // Method to edit a travel
  async putTravel(id: any) 
  {
    // Update the `putTravels` method in ApiService to accept a dynamic `id` and `updatedData` (if needed)
    await this.apiService.openModal('PUT', id); // Open modal for editing a travel
    
  }

  // Method to delete a travel
  async deleteTravel(travel: any) 
  {
    console.log('Deleting travel:', travel); // Log the travel to check if the travel object has the required data

    // Update the `deleteTravels` method in ApiService to accept a dynamic `id`
    await this.apiService.openModal('DELETE', travel); // Open modal for deleting a travel
    
  }

  
}