import { Component, Inject, OnInit } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  email: string;
  content: string;
  emailForm:UntypedFormGroup

  constructor(private applicationService:ApplicationService,
    public dialogRef: MatDialogRef<EmailFormComponent>,
    private builder:UntypedFormBuilder) {
        this.emailForm = this.builder.group({
          email:['',[Validators.required,Validators.email]],
          content:['',Validators.required]
        })
     }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = {
      email: this.email,
      content: this.content
    };
    this.applicationService.sendEmailDecision(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
