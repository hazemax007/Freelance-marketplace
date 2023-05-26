import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email:any
  formGroup:FormGroup

  constructor(private authService:AuthService,
    private formBuilder:FormBuilder) {
      this.formGroup = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]]
      })
     }

  ngOnInit(): void {
  }

  forgetPassword(){
    this.authService.forgetPassword(this.formGroup.value).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }

  getErrorMessageEmail() {
    if (this.formGroup.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formGroup.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

}
