import { Component } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: 'config.page.html',
  styleUrls: ['config.page.scss'],
  standalone: false,
})
export class ConfigPage {

  constructor() {}

  updateProfile() {
    // Lógica para atualizar perfil
  }

  changeNotificationSettings() {
    // Lógica para alterar preferências de notificações
  }
}
