import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-location-comments-modal',
  templateUrl: './location-comments-modal.component.html',
  styleUrls: ['./location-comments-modal.component.scss'],
  standalone: true,
  
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class LocationCommentsModalComponent  implements OnInit {

  @Input() id: string = '';

  comments: any[] = [];


  constructor(
    private modalController: ModalController,
    private apiService: ApiService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loadLocComments();
  }

  // Load Comments (Travel)
  async loadLocComments() 
  {
    this.comments = await this.apiService.getLocationComments(this.id);
  }

  // Dismiss the Modal
  dismiss() 
  {
    this.modalController.dismiss();
  }

  // Delete a Comment
  async deleteLocComment(commentId: string) 
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
            await this.apiService.deleteLocationComments(commentId);
            this.loadLocComments();
          },
        },
      ],
    });
    await confirm.present();
  }

  // Open Modal to Add a Comment
  async openAddLocCommentModal() 
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
              await this.apiService.postLocationComments(this.id, data.comment);
              this.loadLocComments();
            }
          },
        },
      ],
    });
    await alert.present();
  }
}