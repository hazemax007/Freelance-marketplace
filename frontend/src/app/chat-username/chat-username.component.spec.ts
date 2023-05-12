import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsernameComponent } from './chat-username.component';

describe('ChatUsernameComponent', () => {
  let component: ChatUsernameComponent;
  let fixture: ComponentFixture<ChatUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
