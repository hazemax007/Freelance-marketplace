import { UserService } from './../_services/user.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../_services/message.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit,OnDestroy {
  
  receiverId:any
  senderId:any
  listMessages:any
  currentUser:any
  formGroup:FormGroup
  socket: Socket;
  

  constructor(
    private userService:UserService,
    private messageService: MessageService,
    private tokenService: TokenStorageService, 
    private route:ActivatedRoute,
    private builder:FormBuilder) {
      this.formGroup = this.builder.group({
        content:['',Validators.required]
      })
     }

  ngOnInit(): void {
    this.receiverId = this.route.snapshot.params['id']
    this.senderId = this.tokenService.getUser().id
    this.getUser()
    this.getChatMessages()
    console.log(this.receiverId)
    // Connect to the Socket.IO server
    this.socket = io('ws://localhost:8081');

    // Listen for incoming messages
    this.socket.on('newMessage', (message: any) => {
      console.log('socket connectd');
      // this.listMessages.push(message);
      this.getChatMessages()
    });
  }

  getUser(): void {
    var sum =0
    this.userService.getUserById(this.receiverId)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
        },
        error: (e) => console.error(e)
      });
  }

  getChatMessages(){
    this.messageService.getCurrentMessages(this.senderId,this.receiverId)
    .subscribe(
      data => {
        this.listMessages = data.sort((a, b) => a.timestamp - b.timestamp);
        console.log(this.listMessages)
      },error => {
        console.log(error)
      }
    )
  }

  postMessage(event:Event){
    event.preventDefault();
    const senderId = this.senderId
    const receiverId = this.receiverId
    this.messageService.postMessage(this.formGroup.value,this.senderId,this.receiverId)
    .subscribe(
      data =>{
        console.log(data)
        // this.socket.emit('sendMessage', { senderId, receiverId, content: this.formGroup.value });
        this.formGroup.reset();
      },error => {
        console.log(error)
      }
    )
  }

  isSentMessage(message: any): boolean {
    return message.isSent;
  }

  isReceivedMessage(message: any): boolean {
    return message.isReceived;
  }


  /*openApplicationForm(missionId:any) {
    const dialogRef = this.dialog.open(ApplicationComponent,
      {
        data: {
          missionId:missionId,
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.router.navigate(["/missions"])
        }
      },
    });
  }*/

  ngOnDestroy(): void {
    // Disconnect from the Socket.IO server when component is destroyed
    this.socket.disconnect();
  }

}
