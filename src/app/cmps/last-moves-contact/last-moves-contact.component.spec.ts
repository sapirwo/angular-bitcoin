import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMovesContactComponent } from './last-moves-contact.component';

describe('LastMovesContactComponent', () => {
  let component: LastMovesContactComponent;
  let fixture: ComponentFixture<LastMovesContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastMovesContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMovesContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
