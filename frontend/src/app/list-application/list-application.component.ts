import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ApplicationService } from '../_services/application.service';
import { Application } from '../_models/Application';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { error } from 'console';
import { CoreService } from '../_services/core.service';
import { Resume } from '../_models/Resume';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListApplicationComponent implements OnInit {

  columnsToDisplay = ['name', 'startDate', 'mission'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Application | null;
  listResumes:any[] = []
  currentUser:any
  id:any

  constructor(private applicationService:ApplicationService,
    private coreService:CoreService,
    private tokenService:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser()
    this.showListResumes()
  }


  showListResumes(){
    this.applicationService.getAllResumes().subscribe(
      (data:Resume[]) =>{
        for(let i=0;i<data.length;i++){
          if(data[i].user?._id === this.currentUser.id){
            this.listResumes.push(data[i])
            console.log(this.listResumes)
          }
        }
      }
    )
  }

  // showListApplications(){
  //   this.applicationService.getAllApplications().subscribe(
  //     (data:Application[]) => {
  //       for(let i=0;i<data.length;i++){
  //         if(data[i].user?._id === this.currentUser.id){
  //           this.listApplications.push(data[i])
  //           console.log(this.listApplications)
  //         }
  //       }
  //     }
  //   )
  // }

  deleteApplication(id:any) {
    this.applicationService.deleteApplication(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Application canceled !', 'done');
        window.location.reload();
      },
      error: console.log,
    });
  }



}

