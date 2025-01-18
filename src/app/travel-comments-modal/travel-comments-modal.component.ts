import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-travel-comments-modal',
  templateUrl: './travel-comments-modal.component.html',
  styleUrls: ['./travel-comments-modal.component.scss'],
  standalone: true,

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})

export class TravelCommentsModalComponent implements OnInit {

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

  // Load Comments (Travel)
  async loadComments() 
  {
    this.comments = await this.apiService.getTravelComments(this.id);
  }

  // Dismiss the Modal
  dismiss() 
  {
    this.modalController.dismiss();
  }

  // Delete a Comment
  async deleteComment(commentId: string) 
  {
    const confirm = await this.alertController.create({
      header: 'DELETE NOTE',
      message: 'Are you sure you want to DELETE this note?',
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

  // Open Modal to Add a Comment
  async openAddCommentModal() 
  {
    const alert = await this.alertController.create({
      header: 'NEW NOTE',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Write your note...',
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

  // Handle the reordering of items
  handleReorder(event: any) {
    const itemToMove = this.comments.splice(event.detail.from, 1)[0]; // Remove the item from its old position
    this.comments.splice(event.detail.to, 0, itemToMove);             // Insert it at the new position

    // Complete the reorder action
    event.detail.complete();
  }
}