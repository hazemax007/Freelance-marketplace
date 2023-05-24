import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

currentUser:any

  constructor(private tokenService:TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    window.open(`http://localhost:8080/auth/logout`, "_self");
  }

}
