import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { GoogleApiService } from '../_services/google-api.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'role-user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  googleRole:string ='ROLE_USER';
  loginGroup:UntypedFormGroup
  hidePassword = true
  socialUser!: SocialUser;

  constructor(private builder:UntypedFormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private socialAuthService: SocialAuthService
    ) {
      
     }

  ngOnInit(): void {
    this.loginGroup = this.builder.group({
      username : ['',[Validators.required]],
      password : ['',[Validators.required,Validators.minLength(8)]]
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }else{
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.saveGoogleToken(this.socialUser.idToken)
        this.saveGoogleUser(this.socialUser)
        this.isLoginFailed = false;
        this.isLoggedIn = true
        window.sessionStorage.setItem(ROLE_KEY,this.googleRole)
        this.reloadPage()
        console.log(this.socialUser);
      },err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      });
    }
  }


  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
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

  

}
