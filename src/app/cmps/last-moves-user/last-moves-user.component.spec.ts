import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMovesUserComponent } from './last-moves-user.component';

describe('LastMovesUserComponent', () => {
  let component: LastMovesUserComponent;
  let fixture: ComponentFixture<LastMovesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastMovesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMovesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
