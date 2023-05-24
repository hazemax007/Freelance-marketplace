import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

const ROLE_KEY = 'role-user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  private roles: string[] = [];
  googleRole?:any
  isLoggedIn = false;
  showAdminBoard = false;
  showESNBoard = false;
  showFreelancerBoard = false
  showCompanyBoard = false
  showGoogleAuthBoard = false
  username?: string;
  currentUser:any
  

  constructor(private tokenStorageService: TokenStorageService,
    private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn){
      this.currentUser = this.tokenStorageService.getUser();
      this.roles = this.currentUser.roles;
      this.googleRole = window.sessionStorage.getItem(ROLE_KEY)

      this.showAdminBoard = this.roles?.includes('ROLE_ADMIN');
      this.showESNBoard = this.roles?.includes('ROLE_ESN')
      this.showFreelancerBoard = this.roles?.includes('ROLE_FREELANCER')
      this.showCompanyBoard = this.roles?.includes('ROLE_COMPANY')
      if(this.googleRole === 'ROLE_USER'){
        this.showGoogleAuthBoard = true
      }

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
}
