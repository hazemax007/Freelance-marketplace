import { Component, OnInit } from '@angular/core';
import { Resume } from '../_models/Resume';
import { ApplicationService } from '../_services/application.service';
import { error } from 'console';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {

  displayedColumnsResumes: string[] = ['Name','Category', 'Email' ,'Actions']

  resumeList:Resume[]
  resume:Resume

  constructor(private applicationService:ApplicationService,
    private router:Router) { }

  ngOnInit(): void {
    this.showResumeList()
  }

  showResumeList(){
    this.applicationService.getAllResumes().subscribe(
      (data:Resume[])=>{
        this.resumeList=data;
        console.log(this.resumeList)
      },error=>{
        console.log(error)
      }
    )
  }

  goToResumeDetails(id:any){
    this.router.navigate(['/resumeDetails',id])
  }

}
