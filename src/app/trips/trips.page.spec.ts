import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ApiService } from '../services/api.service'; // Adjust the path as necessary

import { TripsPage } from './trips.page';

describe('TripsPage', () => {
  let component: TripsPage;
  let fixture: ComponentFixture<TripsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsPage],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(TripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
