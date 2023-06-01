import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: string[] = ["user","admin","esn","freelancer","company"]; // Example roles, replace with your own
  username = new UntypedFormControl('', [Validators.required]);
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
  selectedRoles: any[] = [];


  form: any = {
    username: null,
    email: null,
    password: null,
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

  handleRoleChange(event: any): void {
    const role = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected role to the array
      this.selectedRoles.push(role);
    } else {
      // Remove the deselected role from the array
      const index = this.selectedRoles.indexOf(role);
      if (index !== -1) {
        this.selectedRoles.splice(index, 1);
      }
    }
  }

  onSubmit(): void{
    // Assign all constants to form input name/id

    const { username, email, password } = this.form;
    

    // Use the authentication service to post a register request
    this.authService.register(username, email, password,this.selectedRoles).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;        
        console.log(this.errorMessage)
      }
    );
  }

}
