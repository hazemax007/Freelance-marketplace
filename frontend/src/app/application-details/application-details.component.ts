import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../_services/application.service';
import { Application } from '../_models/Application';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { EmailFormComponent } from '../email-form/email-form.component';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

  id:any
  application:any
  pdfURL:any

  constructor(private route:ActivatedRoute,
    private applicationService:ApplicationService,
    private sanitizer:DomSanitizer,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.applicationDetails()
  }

  applicationDetails(){
    this.applicationService.getApplicationById(this.id).subscribe(
      data => {
        this.application = data
        console.log(this.application)
      }
    )
  }

  showResume(){
    this.applicationService.getResume(this.application.resume).subscribe(
      data => {
        const file = new Blob([data], {type: 'application/pdf'})
        this.pdfURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
        console.log(this.pdfURL)
      }
    )
  }

  openEmailForm() {
    const dialogRef = this.dialog.open(EmailFormComponent,);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log("email sended successfully")
        }
      },
    });
  }

}
