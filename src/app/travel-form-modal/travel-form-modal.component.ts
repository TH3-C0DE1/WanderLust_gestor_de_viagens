import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-travel-form-modal',
  templateUrl: './travel-form-modal.component.html',
  styleUrls: ['./travel-form-modal.component.scss'],

  imports: [
    IonicModule, // Add this to use Ionic components
    CommonModule,
    FormsModule,
  ],
})
export class TravelFormModalComponent {
  @Input() travel: any = {};        // Travel data (for editing)
  @Input() modalTitle: string = '';  // Title of the modal
  @Input() actionType: 'POST' | 'PUT' | 'DELETE' = 'POST';  // Action type (POST, PUT, DELETE)

  constructor(private modalController: ModalController) {}

  // Handle the form submission (for POST and PUT)
  submitForm() {
    if (this.actionType === 'POST' || this.actionType === 'PUT') {
      // Collect form data and return it
      this.modalController.dismiss(this.travel);
    }
  }

  // Handle DELETE confirmation (for DELETE)
  confirmDelete() {
    if (this.actionType === 'DELETE') {

      console.log('Deleting travel with data:', this.travel);

      // Confirm the deletion and return
      this.modalController.dismiss(true); // Pass true to indicate confirmation
    }
  }

  // Dismiss the modal (Cancel button)
  dismiss() {
    this.modalController.dismiss();  // Close the modal without returning data
  }
}
