import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token:any
  formGroup:FormGroup

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private route: ActivatedRoute) { 
      this.formGroup = this.formBuilder.group({
        password:['',[Validators.required,Validators.minLength(8)]]
      })
    }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token']
  }

  resetPassword(){
    this.authService.resetPassword(this.token,this.formGroup.value).subscribe(
      data => {
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }

}
