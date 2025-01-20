
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { TravelCommentsModalComponent } from '../travel-comments-modal/travel-comments-modal.component';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';

import { ApiService } from '../services/api.service';

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
    this.loadTravels();

    this.apiService.getTravelListChanged().subscribe((travels) => 
    {
      this.travels = travels;
      this.allTravels = [...travels];
    });
  }

  // Fetch Trip
  async loadTravels() 
  {
    this.travels = await this.apiService.getTravels();
    this.allTravels = [...this.travels];
  }

  // Create New Trip
  async postTravel() 
  {
    await this.apiService.openModal('POST');
  }

  // Edit Trip
  async putTravel(id: any) 
  {
    await this.apiService.openModal('PUT', id);
  }

  // Delete Trip
  async deleteTravel(travel: any) 
  {
    await this.apiService.openModal('DELETE', travel);
  }  

  // Open Note Modal
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

  // Fetch Locations -> Trip
  async openLocationsPage(travelId: string) 
  {
    const locations = await this.apiService.getTravelLocations(travelId);

    this.router.navigate(['/tabs/locations'], 
    {
      queryParams: { travelId, locations: JSON.stringify(locations) }
    });
  }

  // Toggle Trip Fav
  async toggleTravelFavorite(travel: any) 
  {
    try
    {
      await this.apiService.toggleTravelFavorite(travel);
  
      travel.isFav = !travel.isFav;
    } 
    
    catch (error) 
    {
      console.error('Error Toggling Favorite.', error);
    }
  }
  
  // Open Filters Modal
  async openFilterModal() 
  {
    const modal = await this.modalController.create({

      component: FilterModalComponent,
      componentProps:
      {
        filterCriteria: { ...this.filterCriteria },
      },

      backdropDismiss: true,
    });

    modal.onDidDismiss().then((result) => {

      if (result.data) 
      {
        this.filterCriteria = result.data;
        this.applyFilters(this.filterCriteria);
      }
    });

    await modal.present();
  }

  // Apply Filters
  applyFilters(criteria: any) 
  {
    if (
      !criteria.isFav &&
      !criteria.companion &&
      !criteria.type &&
      !criteria.status
    ) 

    {
      this.travels = [...this.allTravels];
      return;
    }

    this.travels = this.allTravels.filter((travel) => {

      const matchesFav = !criteria.isFav || travel.isFav;
      const matchesCompanion = !criteria.companion || travel.prop1 === criteria.companion;
      const matchesType = !criteria.type || travel.type === criteria.type;
      const matchesStatus = !criteria.status || travel.state === criteria.status;

      return matchesFav && matchesCompanion && matchesType && matchesStatus;
    });
  }

  // Scroll To Top
  scrollToTop() 
  {
    this.content.scrollToTop(500);
  }
}