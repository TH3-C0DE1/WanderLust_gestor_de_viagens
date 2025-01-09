import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
  standalone: false,
})
export class NotificationsPage {

  constructor() {}

  showNotification = false;
  notification = { title: '', message: '' };

  triggerNotification() {
    this.notification = {
      title: 'New Notification',
      message: 'This is a card-based notification.',
    };
    this.showNotification = true;

    // Automatically dismiss after 5 seconds
    setTimeout(() => this.dismissNotification(), 5000);
  }

  dismissNotification() {
    this.showNotification = false;
  }

}
