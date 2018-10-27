import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsuaquanComponent } from './detailsuaquan.component';

describe('DetailsuaquanComponent', () => {
  let component: DetailsuaquanComponent;
  let fixture: ComponentFixture<DetailsuaquanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsuaquanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsuaquanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
