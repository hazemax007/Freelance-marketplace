import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMissionComponent } from './assign-mission.component';

describe('AssignMissionComponent', () => {
  let component: AssignMissionComponent;
  let fixture: ComponentFixture<AssignMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
