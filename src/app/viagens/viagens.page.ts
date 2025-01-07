import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Import the ApiService

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.page.html',
  styleUrls: ['./viagens.page.scss'],
  standalone: false,
})

export class ViagensPage implements OnInit 
{
  travels: any[] = []; // Array to store the travels data

  constructor(private apiService: ApiService) {} // Inject the ApiService

  ngOnInit() 
  {
    this.loadTravels(); // Call the method to fetch travels when the component initializes
  }

  // Method to fetch travels
  async loadTravels() 
  {
    this.travels = await this.apiService.getTravels(); // Fetch travels from the service and store them
  }

  // Method to create a new travel
  async createTravel() 
  {
    await this.apiService.postTravels(); // Call the API service to create a travel
    this.loadTravels(); // Refresh the list of travels after creation
  }

  // Method to edit a travel
  async editTravel(id: string) 
  {
    // Update the `putTravels` method in ApiService to accept a dynamic `id` and `updatedData` (if needed)
    await this.apiService.putTravels(); // Edit the travel
    this.loadTravels(); // Refresh the list of travels after editing
  }

  // Method to delete a travel
  async deleteTravel(id: string) 
  {
    // Update the `deleteTravels` method in ApiService to accept a dynamic `id`
    await this.apiService.deleteTravels(); // Delete the travel
    this.loadTravels(); // Refresh the list of travels after deletion
  }
}
