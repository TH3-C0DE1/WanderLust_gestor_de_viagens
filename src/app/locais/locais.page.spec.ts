import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LocaisPage } from './locais.page';

describe('LocaisPage', () => {
  let component: LocaisPage;
  let fixture: ComponentFixture<LocaisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaisPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LocaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
