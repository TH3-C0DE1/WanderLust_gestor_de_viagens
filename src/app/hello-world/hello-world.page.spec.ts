import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloWorldPage } from './hello-world.page';

describe('HelloWorldPage', () => {
  let component: HelloWorldPage;
  let fixture: ComponentFixture<HelloWorldPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
