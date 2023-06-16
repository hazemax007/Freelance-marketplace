import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/Message';
import { MessageService } from '../_services/message.service';
import { error } from 'console';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  listUsers:User[]
  currentUser: User={}
  currentIndex = -1
  loggedUser:any

  constructor(private userService:UserService,
    private tokenService:TokenStorageService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.loggedUser = this.tokenService.getUser()
    this.showListUsers()
  }

  showListUsers(){
    this.userService.fetchUsers(this.loggedUser.id).subscribe(
      (data:any) => {
        this.listUsers = data
        console.log(this.listUsers) 
      },
      error => {
        console.log(error)
      }
    )
  }


  refreshList(): void {
    this.showListUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  sendData(event:any){
    console.log(event.target.value)
  }

  goToUserChat(id:any){
    this.router.navigate(['/chatDetails',id])
  }

}
