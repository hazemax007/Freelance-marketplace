import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RatingService } from '../_services/rating.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Rating } from '../_models/Rating';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  intercontrat:User
  currentUser:any
  ratedUserId: any;
  newRating: Rating;

  constructor(private userService:UserService,
    private ratingService:RatingService,
    private tokenStorageService:TokenStorageService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<RatingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { intercontratId: any }) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser()
    this.getIntercontratById()
  }

  onSubmit(): void {
    this.ratingService
      .saveRating(this.currentUser.id, this.data.intercontratId, this.newRating.rate)
      .subscribe();
  }

  getIntercontratById(){
    this.userService.getIntercontratById(this.data.intercontratId).subscribe(
      (data:User) => {
        this.intercontrat = data
        console.log(this.intercontrat)
      }
    )
  }

}
