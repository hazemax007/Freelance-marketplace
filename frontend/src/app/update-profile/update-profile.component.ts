import { User } from './../_models/User';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user:any = {
    id:0,
    username:'',
    email:'',
    password:'',
    firstname:'',
    lastname:'',
    birthdate:new Date(),
    phonenumber:'',
    address:'',
    roles:[]
  }
  imageUrl: string;
  selectedFile:File | null = null
  id:any
  username = new UntypedFormControl('',[Validators.required,Validators.minLength(6)])
  email = new UntypedFormControl('', [Validators.required, Validators.email])
  password = new UntypedFormControl('',Validators.required)
  firstname = new UntypedFormControl('',[Validators.required])
  lastname = new UntypedFormControl('',[Validators.required])
  birthdate = new UntypedFormControl('',[Validators.required])
  phonenumber = new UntypedFormControl('',[Validators.required,Validators.pattern('/^\d+$/'),Validators.minLength(8)])
  address = new UntypedFormControl('',[Validators.required])

  constructor(private route: ActivatedRoute,private router: Router,
    private userService:UserService) { }

  ngOnInit(): void {

    this.user = new User();

    this.id = this.route.snapshot.params['id'];
    
    this.userService.getUserById(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProfile() {
    this.userService.updateUser(this.user,this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
    this.gotoList();
  }

  onSubmit() {
    this.updateProfile();    
  }

  gotoList() {
    this.router.navigate(['/profile',this.id]);
  }

  /*getErrorMessage() {
    if (this.username.hasError('required' || this.email.hasError('required'))
    || this.firstname.hasError('required') || this.lastname.hasError('required')
    || this.birthdate.hasError('required') || this.phonenumber.hasError('required')
    || this.address.hasError('required')) {
      return 'You must enter a value';
    } 
    else if(this.email.hasError('email')){
      return 'Not a valid email'
    }
    else if(this.username.hasError('minLength')){
      return 'You must enter six or more characters'
    }
    else if(this.phonenumber.hasError('minLength')){
      return 'You must enter eight or more characters'
    }
    else if(this.phonenumber.hasError('pattern')){
      return 'You must enter a valid phone number'
    }
    return ''
    
  }*/

}
