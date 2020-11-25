import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBoardComponent } from './filter-board.component';

describe('FilterBoardComponent', () => {
  let component: FilterBoardComponent;
  let fixture: ComponentFixture<FilterBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
