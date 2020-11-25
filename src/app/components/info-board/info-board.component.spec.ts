import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBoardComponent } from './info-board.component';

describe('InfoBoardComponent', () => {
  let component: InfoBoardComponent;
  let fixture: ComponentFixture<InfoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
