import { Component, OnInit } from '@angular/core';
import { Mission } from '../_models/Mission';
import { MissionService } from '../_services/mission.service';
import { Observable } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  listMissions:Mission[]
  currentMission: Mission={}
  currentIndex = -1
  title = ''

  constructor(private missionService:MissionService) { }

  ngOnInit(): void {
    this.showListMissions()
  }

  showListMissions(){
    this.missionService.getAllMissions().subscribe(
      data => {
        this.listMissions = data
        console.log(this.listMissions)
      },
      error => {
        console.log(error)
      }
    )
  }

  refreshList(): void {
    this.showListMissions();
    this.currentMission = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(mission: Mission, index: number): void {
    this.currentMission = mission;
    this.currentIndex = index;
  }

  

}
