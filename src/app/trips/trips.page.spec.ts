import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TripsPage } from './trips.page';

describe('TripsPage', () => {
  let component: TripsPage;
  let fixture: ComponentFixture<TripsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
