import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NotifsPage } from './notifs.page';

describe('NotifsPage', () => {
  let component: NotifsPage;
  let fixture: ComponentFixture<NotifsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotifsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
