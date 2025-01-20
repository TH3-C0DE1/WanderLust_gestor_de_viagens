
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationCommentsModalComponent } from './location-comments-modal.component';

describe('LocationCommentsModalComponent', () => {

  let component: LocationCommentsModalComponent;
  let fixture: ComponentFixture<LocationCommentsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [ LocationCommentsModalComponent ],
      imports: [IonicModule.forRoot()]

    }).compileComponents();

    fixture = TestBed.createComponent(LocationCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});