import { UserService } from './../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:any
  currentUser: any;
  user:User 
  selectedFile:File
  formData:FormData
  

  constructor(private token: TokenStorageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.id = this.activatedRoute.snapshot.params['id'];  
    this.getCurrentUser()
    
  }

  getCurrentUser(){
    this.userService.getUserById(this.id)
    .subscribe(data => {
      console.log(data)
      this.user = data
    }, error => console.log(error))
  }
  
  updateProfile(id:any){
    this.router.navigate(['updateProfile',id])
  }
  

}
