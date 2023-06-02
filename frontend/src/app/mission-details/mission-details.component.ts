import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../_models/Mission';
import { MissionService } from '../_services/mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationComponent } from '../application/application.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { RatingFormComponent } from '../rating-form/rating-form.component';
import { RatingService } from '../_services/rating.service';
import { Rating } from '../_models/Rating';

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
    duration:0,
    ratings:[]
  };
  @Input() currentUser: User 
  
  message = '';

  
  constructor(
    private missionService:MissionService, 
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMission(this.route.snapshot.params["id"]);
    }
  }

  getMission(id: any): void {
    var sum =0
    this.missionService.getMissionById(id)
      .subscribe({
        next: (data) => {
          this.currentMission = data;
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

  openRatingForm(missionId:any){
    const dialogRef = this.dialog.open(RatingFormComponent,
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

  getStarsArray(averageRating: number): boolean[] {
    const maxRating = 5;
    const filledStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;
  
    const starsArray: boolean[] = [];
  
    for (let i = 1; i <= maxRating; i++) {
      if (i <= filledStars) {
        starsArray.push(true);
      } else if (i === filledStars + 1 && hasHalfStar) {
        starsArray.push(false); // Display half-filled star
      } else {
        starsArray.push(false); // Display empty star
      }
    }
  
    return starsArray;
  }

}
