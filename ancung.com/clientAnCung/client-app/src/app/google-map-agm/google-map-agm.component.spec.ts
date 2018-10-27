import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapAgmComponent } from './google-map-agm.component';

describe('GoogleMapAgmComponent', () => {
  let component: GoogleMapAgmComponent;
  let fixture: ComponentFixture<GoogleMapAgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapAgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapAgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
