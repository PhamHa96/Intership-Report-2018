import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfriendsComponent } from './listfriends.component';

describe('ListfriendsComponent', () => {
  let component: ListfriendsComponent;
  let fixture: ComponentFixture<ListfriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
