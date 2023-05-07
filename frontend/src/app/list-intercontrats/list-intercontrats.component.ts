import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../_services/rating.service';
import { Rating } from '../_models/Rating';
import { TokenStorageService } from '../_services/token-storage.service';
import { RatingFormComponent } from '../rating-form/rating-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-list-intercontrats',
  templateUrl: './list-intercontrats.component.html',
  styleUrls: ['./list-intercontrats.component.css']
})
export class ListIntercontratsComponent implements OnInit {
  displayedIntercontratsColumns: string[] = ['username', 'email','actions'];

  ratedUserId: any;
  rating: any = {};
  newRating: Rating;
  listIntercontrats:any
  currentUser:any

  constructor(private userService:UserService,
    private route: ActivatedRoute,
    private coreService:CoreService,
    private ratingService: RatingService,
    private tokenStorageService:TokenStorageService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser()
    this.showIntercontratsList()
  }

  showIntercontratsList(){
    this.userService.getAllIntercontrats().subscribe(
      data => {
        this.listIntercontrats = data
        console.log(this.listIntercontrats)
      }
    )
  }

  getRating(): void {
    this.ratingService.getRating(this.ratedUserId).subscribe((data) => {
      this.rating = data;
      console.log(this.rating)
    });
  }

  onSubmit(): void {
    this.ratingService
      .saveRating(this.currentUser.id, this.ratedUserId, this.newRating)
      .subscribe(() => {
        this.getRating();
      });
  }

  openRatingForm(intercontratId:any) {
    const dialogRef = this.dialog.open(RatingFormComponent,
      {
        data: {
          intercontratId:intercontratId
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.showIntercontratsList()
        }
      },
    });
  }

  deleteIntercontrat(id:any){
    this.userService.deleteIntercontrat(id).subscribe({
      next:() => {
        this.coreService.openSnackBar('Intercontrat deleted!', 'done')
        window.location.reload();
      }
    })
  }

}
