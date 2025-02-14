
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

// import { HttpClientModule } from '@angular/common/http'; // TEST - ng test --configuration=ci

import { ApiService } from '../services/api.service';
import { TravelFormModalComponent } from './travel-form-modal.component';

describe('TravelFormModalComponent', () => {

  let component: TravelFormModalComponent;
  let fixture: ComponentFixture<TravelFormModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      imports: [IonicModule.forRoot(), TravelFormModalComponent],
      providers: [ApiService],

    }).compileComponents();

    fixture = TestBed.createComponent(TravelFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});