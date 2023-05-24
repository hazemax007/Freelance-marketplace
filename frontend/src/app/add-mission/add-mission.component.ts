import { Component, OnInit } from '@angular/core';
import { Mission } from '../_models/Mission';
import { MissionService } from '../_services/mission.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {

  mission:Mission
  missionForm:UntypedFormGroup

  constructor(private missionService:MissionService,
    private router:Router,
    private missionBuilder:UntypedFormBuilder) {
      this.missionForm = this.missionBuilder.group({
        title:['',Validators.required],
        field:['',Validators.required],
        technology:['',Validators.required],
        requirments:['',Validators.required],
        duration:['',Validators.required],
        description:['',Validators.required]
      }
      )
     }

  ngOnInit(): void {
  }

  addMission(){
    this.missionService.addMission(this.missionForm.value).subscribe(
      (data:Mission) => {
        console.log(data)
      },
      error => {
        console.log(error.message)
      }
    )
    this.mission = new Mission()
    this.goToList()
  }

  onSubmit(){
    this.addMission()
  }

  goToList(){
    this.router.navigate(['/dashboard'])
  }

}
