import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ApiService } from '../services/api.service'; // Adjust the path as necessary

import { TravelCommentsModalComponent } from './travel-comments-modal.component';

describe('TravelCommentsModalComponent', () => {
  let component: TravelCommentsModalComponent;
  let fixture: ComponentFixture<TravelCommentsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TravelCommentsModalComponent, HttpClientModule],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
