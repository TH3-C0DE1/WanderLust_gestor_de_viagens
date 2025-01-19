
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';

import { IonContent, ModalController } from '@ionic/angular';
import { TravelCommentsModalComponent } from '../travel-comments-modal/travel-comments-modal.component';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: false,
})

export class TripsPage implements OnInit 
{
  @ViewChild(IonContent) content!: IonContent;
  
  travels: any[] = [];
  allTravels: any[] = [];

  filterCriteria = {
    isFav: false,
    companion: '',
    type: '',
    status: '',
  };

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
      this.allTravels = [...travels];
    });
  }

  // Fetch Travels
  async loadTravels() 
  {
    this.travels = await this.apiService.getTravels();
    this.allTravels = [...this.travels];
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

  async toggleTravelFavorite(travel: any) {
    try {
      await this.apiService.toggleTravelFavorite(travel);
  
      // Update the local favorite status to reflect the change
      travel.isFav = !travel.isFav;
      //this.loadTravels();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
  
  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      componentProps: {
        filterCriteria: { ...this.filterCriteria }, // Pass current filters
      },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.filterCriteria = result.data; // Update current filters
        this.applyFilters(this.filterCriteria);
      }
    });

    await modal.present();
  }

  applyFilters(criteria: any) {
    if (
      !criteria.isFav &&
      !criteria.companion &&
      !criteria.type &&
      !criteria.status
    ) {
      // No filters applied, restore the full list
      this.travels = [...this.allTravels];
      return;
    }

    // Apply filters
    this.travels = this.allTravels.filter((travel) => {
      const matchesFav = !criteria.isFav || travel.isFav;
      const matchesCompanion = !criteria.companion || travel.prop1 === criteria.companion;
      const matchesType = !criteria.type || travel.type === criteria.type;
      const matchesStatus = !criteria.status || travel.status === criteria.status;

      return matchesFav && matchesCompanion && matchesType && matchesStatus;
    });
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }
}