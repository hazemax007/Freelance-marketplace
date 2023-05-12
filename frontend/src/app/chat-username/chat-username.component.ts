import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-username',
  templateUrl: './chat-username.component.html',
  styleUrls: ['./chat-username.component.css']
})
export class ChatUsernameComponent implements OnInit {
  @Output() userNameEvent = new EventEmitter<string>();

  userName = '';

  constructor() { }

  ngOnInit(): void {
  }

  setUserName(): void {
    this.userNameEvent.emit(this.userName);
  }

}
