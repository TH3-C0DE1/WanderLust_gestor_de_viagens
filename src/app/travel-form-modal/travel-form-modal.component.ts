import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

enum TravelType 
{
  Leisure = 'Lazer',
  Business = 'Trabalho',
  Family = 'Familiar',
  Educational = 'Educacional',
  Event =  'Evento',
  Volunteer = 'Voluntariado',
  RoadTrip = 'Viagem de Carro',
  Shopping = 'Compras',
  Beach = 'Praia',
  Mountain = 'Montanha',
  Cruise = 'Cruzeiro',
  Safari = 'Safári',
  Expedition = 'Expedição',
}

enum TravelState 
{
  Planned = 'Planeada',
  InProgress = 'Em Progresso',
  Completed = 'Concluída',
  Cancelled = 'Cancelada',
}

enum TravelCompanion 
{
  Alone = 'Sozinho',
  Companion = 'Com Acompanhante',
  Group  = 'Em Grupo',
  Family  = 'Em Família',
}

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
export class TravelFormModalComponent 
{
  travelTypes = Object.values(TravelType);
  travelStates = Object.values(TravelState);
  travelComp = Object.values(TravelCompanion);

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
  confirmDelete() 
  {
    if (this.actionType === 'DELETE') 
    {
      this.modalController.dismiss(true); // Pass true to indicate confirmation
    }
  }

  // Dismiss the modal (Cancel button)
  dismiss() 
  {
    this.modalController.dismiss();  // Close the modal without returning data
  }
}