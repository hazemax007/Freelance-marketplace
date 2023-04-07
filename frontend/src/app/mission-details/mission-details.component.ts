import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../_models/Mission';
import { MissionService } from '../_services/mission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentMission: Mission = {
    title: '',
    description: '',
    field:'',
    technology:'',
    requirments:'',
    duration:0
  };
  
  message = '';
  
  constructor(private missionService:MissionService, private route:ActivatedRoute) { }

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

}
