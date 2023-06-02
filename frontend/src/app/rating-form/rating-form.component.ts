import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RatingService } from '../_services/rating.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Rating } from '../_models/Rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  currentUser:any
  rating: any;
  ratingForm:FormGroup

  constructor(private userService:UserService,
    private ratingService:RatingService,
    private tokenStorageService:TokenStorageService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<RatingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { missionId: any },
    private builder:FormBuilder,
    private coreService:CoreService) {
      this.ratingForm = this.builder.group({
        value:['',Validators.required]
      })
     }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser()
  }

  onSubmit(): void {
    this.ratingService
      .saveRating(this.data.missionId,this.currentUser.id, this.ratingForm.value)
      .subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Rate added successfully');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  

}
