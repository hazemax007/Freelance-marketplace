import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

const ROLE_KEY = 'role-user'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private roles: string[] = [];
  googleRole?:any
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showESNBoard = false;
  showFreelancerBoard = false
  showCompanyBoard = false
  showGoogleAuthBoard = false
  username?: string;
  currentUser:any

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    

    if (this.isLoggedIn){
      this.currentUser = this.tokenStorageService.getUser();
      this.googleRole = window.sessionStorage.getItem(ROLE_KEY)
      
      this.roles = this.currentUser.roles

      this.showAdminBoard = this.roles?.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles?.includes('ROLE_USER');
      this.showESNBoard = this.roles?.includes('ROLE_ESN')
      this.showFreelancerBoard = this.roles?.includes('ROLE_FREELANCER')
      this.showCompanyBoard = this.roles?.includes('ROLE_COMPANY')
      if(this.googleRole === 'ROLE_USER'){
        this.showGoogleAuthBoard = true
      }
      console.log(this.showGoogleAuthBoard)

      this.username = this.currentUser.username;
    }

  }

  logout(): void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  goToProfile(id:any){
    this.router.navigate(['profile',id])
  }

  goToListapplications(id:any){
    this.router.navigate(['listApplications',id])
  }


}
