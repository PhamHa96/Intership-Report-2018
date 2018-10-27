import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanliquananComponent } from './quanliquanan.component';

describe('QuanliquananComponent', () => {
  let component: QuanliquananComponent;
  let fixture: ComponentFixture<QuanliquananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanliquananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanliquananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
