import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedIn?: boolean = false;
  isLoginFailed?: boolean = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],})
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.saveGoogleToken(this.socialUser.idToken)
        this.saveGoogleUser(this.socialUser)
        this.isLoginFailed = false;
        this.isLoggedIn = true
        this.roles = ['ROLE_USER']
        console.log(this.socialUser);
      },err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      });
  }


  saveGoogleToken(token:any) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveGoogleUser(user:any){
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user))
  }

  reloadPage(): void {
    window.location.reload();
  }


  logOut(): void {
    this.socialAuthService.signOut();
    window.sessionStorage.clear();
    this.reloadPage()
  }

}
