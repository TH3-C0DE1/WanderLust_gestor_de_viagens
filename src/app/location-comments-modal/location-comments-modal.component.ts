
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';

@Component({

  selector: 'app-location-comments-modal',
  templateUrl: './location-comments-modal.component.html',
  styleUrls: ['./location-comments-modal.component.scss'],
  standalone: true,
  
  imports: 
  [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})

export class LocationCommentsModalComponent  implements OnInit 
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
    this.loadLocComments();
  }

  // Fetch Notes (Location)
  async loadLocComments() 
  {
    this.comments = await this.apiService.getLocationComments(this.id);
  }

  // Dismiss Modal
  dismiss() 
  {
    this.modalController.dismiss();
  }

  // Delete Note (Location)
  async deleteLocComment(commentId: string) 
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

            await this.apiService.deleteLocationComments(commentId);
            this.loadLocComments();
          },
        },
      ],
    });

    await confirm.present();
  }

  // Add Note (Location)
  async openAddLocCommentModal() 
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

              await this.apiService.postLocationComments(this.id, data.comment);
              this.loadLocComments();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Handle Reordering Notes (Location)
  handleReorder(event: any) 
  {
    const itemToMove = this.comments.splice(event.detail.from, 1)[0];
    this.comments.splice(event.detail.to, 0, itemToMove);

    event.detail.complete();
  }
}