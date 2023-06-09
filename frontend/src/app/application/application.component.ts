import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from '../_services/application.service';
import { CoreService } from '../_services/core.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MissionService } from '../_services/mission.service';
import { Mission } from '../_models/Mission';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  selectedFile:File | null = null
  currentUser:any
  id:any

  applicationForm:UntypedFormGroup

  application = {
    name:'',
    availibility:'',
    description:'',
    applicationDate:null as null,
    resume: null as null
  }

  constructor(private applicationBuilder:UntypedFormBuilder,
    public dialogRef: MatDialogRef<ApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { missionId: any, userId:any },
    private applicationService:ApplicationService,
    private tokenService:TokenStorageService,
    private coreService:CoreService,
    private userService:UserService,
    private route:ActivatedRoute) {
    this.applicationForm = this.applicationBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      startDate:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser()
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('name', this.applicationForm.get('name').value);
  //   formData.append('description', this.applicationForm.get('description').value);
  //   formData.append('startDate', this.applicationForm.get('startDate').value);
  //   formData.append('resume', this.selectedFile , this.selectedFile.name);
  //   if (this.applicationForm.valid) {
  //       this.applicationService.addApplication(this.currentUser.id,this.data.missionId,formData).subscribe({
  //         next: (val: any) => {
  //           this.coreService.openSnackBar('Application sended successfully');
  //           this.dialogRef.close(true);
  //         },
  //         error: (err: any) => {
  //           console.error(err);
  //         },
  //       });
  //     }
  //   }

  onSubmit() {
    const formData = new FormData();
    formData.append('resume', this.selectedFile , this.selectedFile.name);
    
        this.applicationService.resumeParser(formData).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Resume sended successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      
    }
  

}
