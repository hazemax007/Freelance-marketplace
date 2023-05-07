import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MissionService } from '../_services/mission.service';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css']
})
export class EditMissionComponent implements OnInit {

  missionForm:FormGroup

  constructor(public dialogRef: MatDialogRef<EditMissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private missionService:MissionService,
    private coreService:CoreService,
    private missionBuilder:FormBuilder) {
      this.missionForm = this.missionBuilder.group({
        title:['',Validators.required],
        field:['',Validators.required],
        technology:['',Validators.required],
        requirments:['',Validators.required],
        duration:['',Validators.required],
        description:['',Validators.required]
      }
      )
     }

  ngOnInit(): void {
    this.missionForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.missionForm.valid) {
      if (this.data) {
        this.missionService
          .updateMission(this.missionForm.value,this.data._id)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Mission detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.missionService.addMission(this.missionForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Mission added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
