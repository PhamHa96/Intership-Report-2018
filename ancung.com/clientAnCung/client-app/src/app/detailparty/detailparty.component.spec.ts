import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpartyComponent } from './detailparty.component';

describe('DetailpartyComponent', () => {
  let component: DetailpartyComponent;
  let fixture: ComponentFixture<DetailpartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
