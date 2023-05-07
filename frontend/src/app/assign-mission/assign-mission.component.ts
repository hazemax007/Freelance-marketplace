import { UserService } from './../_services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MissionService } from '../_services/mission.service';
import { User } from '../_models/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-assign-mission',
  templateUrl: './assign-mission.component.html',
  styleUrls: ['./assign-mission.component.css']
})
export class AssignMissionComponent implements OnInit {

  selectedUserId: any;
  users:User[]

  constructor(private missionService:MissionService,
    private UserService:UserService,
    public dialogRef: MatDialogRef<AssignMissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { missionId: any },
    private coreService:CoreService) { }

  ngOnInit(): void {
    this.getAllUsers()
    console.log(this.data.missionId)
  }

  assignProject() {
    const formData = new FormData()
    formData.append('user',this.selectedUserId)
    if (!this.selectedUserId) {
      return; // User and project must be selected
    }
    this.missionService.assignProject(this.data.missionId,this.selectedUserId,formData)
      .subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Project assigned to user!', 'done');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      }
      );
  }

  getAllUsers(){
    this.UserService.getAllUsers().subscribe(
      data => {
        this.users = data
        console.log(this.users)
      }
    )
  }

}
