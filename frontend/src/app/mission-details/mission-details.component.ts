import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../_models/Mission';
import { MissionService } from '../_services/mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationComponent } from '../application/application.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentMission: Mission = {
    _id:null,
    title: '',
    description: '',
    field:'',
    technology:'',
    requirments:'',
    duration:0
  };
  @Input() currentUser: User 
  
  message = '';
  
  constructor(private missionService:MissionService, private route:ActivatedRoute,
    private dialog:MatDialog,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMission(this.route.snapshot.params["id"]);
    }
  }

  getMission(id: any): void {
    this.missionService.getMissionById(id)
      .subscribe({
        next: (data) => {
          this.currentMission = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  openApplicationForm(missionId:any) {
    const dialogRef = this.dialog.open(ApplicationComponent,
      {
        data: {
          missionId:missionId,
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.router.navigate(["/missions"])
        }
      },
    });
  }

}
