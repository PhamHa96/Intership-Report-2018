import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuananComponent } from './quanan.component';

describe('QuananComponent', () => {
  let component: QuananComponent;
  let fixture: ComponentFixture<QuananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
