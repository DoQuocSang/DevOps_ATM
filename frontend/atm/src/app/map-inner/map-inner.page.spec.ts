import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapInnerPage } from './map-inner.page';

describe('MapInnerPage', () => {
  let component: MapInnerPage;
  let fixture: ComponentFixture<MapInnerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
