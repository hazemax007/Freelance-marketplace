import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit {

  confirmationCode:any
  constructor(private authService:AuthService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmationCode = this.route.snapshot.params['confirmationCode']
    this.authService.verifyUser(this.confirmationCode).subscribe(
      data => {
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }


}
