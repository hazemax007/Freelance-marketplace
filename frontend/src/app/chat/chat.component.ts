import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../_services/message.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { io } from 'socket.io-client';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  messages: any[] = [];
  socket: any;
  text: any;
  userId:any
  
  constructor(private messageService:MessageService,private tokenService:TokenStorageService) {
    this.socket = io(); 
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id
    this.socket.on('chat message', (message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage(text: string, userId: any) {
    this.messageService.sendMessage(text).subscribe(
      (response: any) => {
        console.log('Message sent:', response);
      },
      (error: any) => {
        console.error('Failed to send message:', error);
      }
    );
  }

}
