import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';  // Import the loader service

@Component({
  selector: 'app-viagens',
  templateUrl: 'viagens.page.html',
  styleUrls: ['viagens.page.scss'],
  standalone: false,
})
export class ViagensPage implements OnInit {

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    // Optionally, show the loader when the page is initialized
    this.loaderService.showLoader('Loading Data...');
    
    // Simulate an async operation (like data fetching)
    setTimeout(() => {
      // After the operation completes, hide the loader
      this.loaderService.hideLoader();
    }, 3000); // You can simulate any async operation here
  }

  // Example of triggering the loader manually with a button click
  loadData() {
    this.loaderService.showLoader('Loading Data...');
    
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 3000);
  }
}
