import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: false,
})
export class ProfilePage {

  constructor() {}

  updateProfile() {
    // Lógica para atualizar perfil
  }

  changeNotificationSettings() {
    // Lógica para alterar preferências de notificações
  }
}
