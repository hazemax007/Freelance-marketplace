import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from './customValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = new UntypedFormControl('', [Validators.required]);
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [Validators.required, Validators.minLength(8)])

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  hidePassword = true
  hideConfirmPassword = true


  constructor(
    private authService:AuthService,
    private router:Router) { 
  }

  ngOnInit(): void {
    
  }

  getErrorMessageUsername(){
    if(this.username.hasError('required')){
      return 'You must enter a value'
    }
    return''
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('password') ? 'Should be more than 8 caracters' : '';
  }

  onSubmit(): void{
    // Assign all constants to form input name/id
    const { username, email, password } = this.form;

    // Use the authentication service to post a register request
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;        
      }
    );
  }

}
