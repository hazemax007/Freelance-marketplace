import { Component, OnInit } from '@angular/core';
import { Resume } from '../_models/Resume';
import { ApplicationService } from '../_services/application.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {

  resume:Resume
  skills:any[]
  id:any

  constructor(private applicationService:ApplicationService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.showResumeDetails()
  }

  showResumeDetails(){
    this.applicationService.getResume(this.id).subscribe(
      (data:Resume) => {
        this.resume = data
        this.skills = data.skills[0].split(',')
        console.log(this.resume)
      },error => {
        console.log(error)
      }
    )
  }

}
