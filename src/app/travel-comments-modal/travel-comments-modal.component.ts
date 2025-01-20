
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';

@Component({

  selector: 'app-travel-comments-modal',
  templateUrl: './travel-comments-modal.component.html',
  styleUrls: ['./travel-comments-modal.component.scss'],
  standalone: true,

  imports: 
  [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})

export class TravelCommentsModalComponent implements OnInit 
{
  @Input() id: string = '';

  comments: any[] = [];

  constructor(

    private modalController: ModalController,
    private apiService: ApiService,
    private alertController: AlertController,

  ) { }

  ngOnInit() 
  {
    this.loadComments();
  }

  // Fetch Notes (Trips)
  async loadComments() 
  {
    this.comments = await this.apiService.getTravelComments(this.id);
  }

  // Dismiss Modal
  dismiss() 
  {
    this.modalController.dismiss();
  }

  // Delete Note (Trips)
  async deleteComment(commentId: string) 
  {
    const confirm = await this.alertController.create({

      header: 'DELETE NOTE',
      message: 'Are you sure you want to DELETE this Note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },

        {
          text: 'Delete',
          handler: async () => {

            await this.apiService.deleteTravelComments(commentId);
            this.loadComments();
          },
        },
      ],
    });

    await confirm.present();
  }

  // Add Note (Trips)
  async openAddCommentModal() 
  {
    const alert = await this.alertController.create({

      header: 'NEW NOTE',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Write your Note...',
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },

        {
          text: 'Add',
          handler: async (data) => {
            if (data.comment) {

              await this.apiService.postTravelComments(this.id, data.comment);
              this.loadComments();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Handle Reordering Notes (Trips)
  handleReorder(event: any) 
  {
    const itemToMove = this.comments.splice(event.detail.from, 1)[0];
    this.comments.splice(event.detail.to, 0, itemToMove);

    event.detail.complete();
  }
}