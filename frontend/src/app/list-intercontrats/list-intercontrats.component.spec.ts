import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntercontratsComponent } from './list-intercontrats.component';

describe('ListIntercontratsComponent', () => {
  let component: ListIntercontratsComponent;
  let fixture: ComponentFixture<ListIntercontratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIntercontratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIntercontratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
