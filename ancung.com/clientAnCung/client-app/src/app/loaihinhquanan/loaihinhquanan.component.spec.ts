import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaihinhquananComponent } from './loaihinhquanan.component';

describe('LoaihinhquananComponent', () => {
  let component: LoaihinhquananComponent;
  let fixture: ComponentFixture<LoaihinhquananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaihinhquananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaihinhquananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
