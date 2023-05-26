import { UserService } from './../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

const USER_KEY = "auth-user"

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
  googleUser:any
  

  constructor(private token: TokenStorageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.googleUser = JSON.parse(window.sessionStorage.getItem(USER_KEY))
    this.currentUser = this.token.getUser();
    this.id = this.activatedRoute.snapshot.params['id'];  
    this.getCurrentUser()
    this.sanitizeImageURL(this.googleUser.photoUrl)
    console.log(this.googleUser)
    
  }

  getCurrentUser(){
    this.userService.getUserById(this.id)
    .subscribe(data => {
      console.log(data)
      this.user = data
      this.googleUser = false
    }, error => console.log(error))
  }

  getCurrentGoogleUser(){
    const socialUser = window.sessionStorage.getItem(USER_KEY)
    if(socialUser){
      this.googleUser = true
      return JSON.parse(socialUser)
    }
    return {}
  }

  sanitizeImageURL(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
  
  updateProfile(id:any){
    this.router.navigate(['updateProfile',id])
  }


  

}
