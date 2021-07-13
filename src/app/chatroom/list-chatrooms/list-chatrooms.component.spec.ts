import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatroomsComponent } from './list-chatrooms.component';

describe('ListChatroomsComponent', () => {
  let component: ListChatroomsComponent;
  let fixture: ComponentFixture<ListChatroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChatroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChatroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
