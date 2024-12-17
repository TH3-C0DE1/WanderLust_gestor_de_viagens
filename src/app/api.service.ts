import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://mobile-api-one.vercel.app/api/travels/';
  private name = 'marciopinheiro@ipvc.pt';
  private password = 'L3@wZn2K';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });
  }
}