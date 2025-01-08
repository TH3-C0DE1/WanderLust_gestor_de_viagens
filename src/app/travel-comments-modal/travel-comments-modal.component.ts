import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';


@Component({
  standalone: true,
  selector: 'app-travel-comments-modal',
  templateUrl: './travel-comments-modal.component.html',
  styleUrls: ['./travel-comments-modal.component.scss'],

  imports: [
    IonicModule, // Add this to use Ionic components
    CommonModule,
    FormsModule,
  ],
})
export class TravelCommentsModalComponent implements OnInit {

  @Input() id: string = ''; // Receive Travel ID as input

  comments: any[] = []; // Array to store comments

  constructor(

    private modalController: ModalController,
    private apiService: ApiService,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.loadComments();
  }

  // Method to load comments for the travel
  async loadComments() {
    this.comments = await this.apiService.getTravelComments(this.id);
  }

  // Dismiss the modal
  dismiss() {
    this.modalController.dismiss();
  }

    // Delete a comment
    async deleteComment(commentId: string) {
      const confirm = await this.alertController.create({
        header: 'Confirmar',
        message: 'Tem certeza que deseja apagar este comentário?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Apagar',
            handler: async () => {
              await this.apiService.deleteTravelComments(commentId);
              this.loadComments(); // Refresh comments
            },
          },
        ],
      });
      await confirm.present();
    }
  
    // Open modal to add a comment
    async openAddCommentModal() {
      const alert = await this.alertController.create({
        header: 'Novo Comentário',
        inputs: [
          {
            name: 'comment',
            type: 'text',
            placeholder: 'Escreva seu comentário...',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Adicionar',
            handler: async (data) => {
              if (data.comment) {
                await this.apiService.postTravelComments(this.id, data.comment);
                this.loadComments(); // Refresh comments
              }
            },
          },
        ],
      });
      await alert.present();
    }

}
