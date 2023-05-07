import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MissionService } from '../_services/mission.service';
import { User } from '../_models/User';
import { Mission } from '../_models/Mission';
import { MatDialog } from '@angular/material/dialog';
import { EditMissionComponent } from '../edit-mission/edit-mission.component';
import { CoreService } from '../_services/core.service';
import { ApplicationService } from '../_services/application.service';
import { Application } from '../_models/Application';
import { error } from 'console';
import { Router } from '@angular/router';
import { ArchiveFormComponent } from '../archive-form/archive-form.component';
import { AssignMissionComponent } from '../assign-mission/assign-mission.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedUserColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'birthdate', 'phonenumber','actions'];
  displayedMissionColumns: string[] = ['title', 'field', 'technology', 'duration', 'actions'];
  displayedColumnsApplications: string[] = ['name','startDate','actions']
  listMissions :Mission[]
  listUsers:User[]
  listApplications:Application[]
  searchUser=''
  searchMission=''
  searchApplication=''
  mission:Mission

  constructor(private userService:UserService,
    private missionService:MissionService,
    private dialog: MatDialog,
    private coreService:CoreService,
    private applicationService:ApplicationService,
    private router:Router) { }

  ngOnInit(): void {
    this.getListUsers()
    this.getListMissions()
    this.getListApplications()
  }

  getListUsers(){
    this.userService.getAllUsers().subscribe(
      data => {
        this.listUsers = data
        console.log(this.listUsers)
      },
      error => {
        console.log(error)
      }
    )
  }

  getListMissions(){
    this.missionService.getAllMissions().subscribe(
      data => {
        this.listMissions = data
        console.log(this.listMissions)
      },
      error => {
        console.log(error)
      }
    )
  }

  getListApplications(){
    this.applicationService.getAllApplications().subscribe(
      data => {
        this.listApplications = data
        console.log(this.listApplications)
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteMission(id:any) {
    this.missionService.deleteMission(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Mission deleted!', 'done');
        this.getListMissions();
      },
      error: console.log,
    });
  }

  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe({
      next:(res) => {
        this.coreService.openSnackBar('User deleted!', 'done')
        this.getListUsers()
      },
      error: console.log
    })
  }

  deleteApplication(id:any){
    this.applicationService.deleteApplication(id).subscribe({
      next:() => {
        this.coreService.openSnackBar('Application deleted!', 'done')
        this.getListApplications()
      }
    })
  }

  goToApplication(id:any){
    this.router.navigate(['application',id])
  }

  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EditMissionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EditMissionComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions();
        }
      },
    });
  }

  openArchiveForm(missionId:any) {
    const dialogRef = this.dialog.open(ArchiveFormComponent,
      {
        data: {
          missionId:missionId
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions()
        }
      },
    });
  }

  openAssignProjectForm(missionId:any) {
    const dialogRef = this.dialog.open(AssignMissionComponent,
      {
        data: {
          missionId:missionId
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions();
        }
      },
    });
  }

  intercontrat(id:any){
    this.userService.defineIntercontrat(id).subscribe(
      (data) => {
        console.log("success")
      },error =>{
        console.log(error)
      }
    )
  }



}
