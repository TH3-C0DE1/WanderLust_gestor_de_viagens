import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})

export class FilterModalComponent implements OnInit {

  @Input() filterCriteria: any = {
    isFav: false,
    companion: '',
    type: '',
    status: '',
  };

  travelCompanion = [
    'Alone', 
    'With Company', 
    'In Group', 
    'In Family',
  ];

  travelTypes = [
    'Leisure', 
    'Business', 
    'Family', 
    'Educational', 
    'Event',
    'Volunteer', 
    'Road Trip', 
    'Shopping', 
    'Beach', 
    'Mountain',
    'Cruise', 
    'Safari', 
    'Expedition',
  ];

  travelStates = [
    'Planned', 
    'Scheduled', 
    'Postponed', 
    'Completed', 
    'Cancelled',
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Ensure modal is initialized with the passed filter criteria
  }

  applyFilters() {
    this.modalController.dismiss(this.filterCriteria);
  }

  resetFilters() {
    this.filterCriteria = {
      isFav: false,
      companion: '',
      type: '',
      status: '',
    };
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
