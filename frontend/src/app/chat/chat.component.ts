import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Message } from '../_models/Message';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  sender: string = '';
  text: string = '';
  socket: Socket

  constructor(private messageService: MessageService) { 
  }

  ngOnInit(): void {
    this.getMessages()
    this.socket.on('message', (message: Message) => {
      this.messages.push(message);
    });
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error retrieving messages:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.sender && this.text) {
      this.messageService.postMessage(this.sender, this.text).subscribe(
        (newMessage: Message) => {
          this.messages.push(newMessage);
          this.sender = '';
          this.text = '';
          this.socket.emit('message', newMessage);
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }
}
