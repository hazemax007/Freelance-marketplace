import { Component, OnInit } from '@angular/core';
import { Mission } from '../_models/Mission';
import { MissionService } from '../_services/mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Rating } from '../_models/Rating';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  listMissions:Mission[]
  currentMission: Mission={}
  currentIndex = -1
  category :string  = ''
  technology:string = ''
  displayedColumns: string[] = ['Title', 'Category', 'Tools', 'Duration'];
  

  constructor(private missionService:MissionService,private userService:UserService,
    private route:ActivatedRoute) { }

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

  setActiveMission(mission: Mission, index: number): void {
    this.currentMission = mission;
    this.currentIndex = index;
  }

  search(): void {
    this.currentMission = {};
    this.currentIndex = -1;

    this.missionService.findByPreferences(this.category,this.technology)
      .subscribe({
        next: (data) => {
          this.listMissions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  sendData(event:any){
    console.log(event.target.value)
  }


}
