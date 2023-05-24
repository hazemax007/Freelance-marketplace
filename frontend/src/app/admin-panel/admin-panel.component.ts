import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { MissionService } from '../_services/mission.service';

Chart.register(...registerables);


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit,AfterViewInit {
  @ViewChild('missionsChartCanvas', { static: true }) missionsChartCanvas: ElementRef;

  missionsData: any[] = [];

  constructor(private missionService:MissionService) { }
  

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const ctx: CanvasRenderingContext2D = this.missionsChartCanvas.nativeElement.getContext('2d');

    this.missionService.getAllMissions()
      .subscribe(missions => {
        this.missionsData = missions;
        this.createChart(ctx);
      });
  }

  createChart(ctx: CanvasRenderingContext2D) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.missionsData.map(mission => mission.title),
        datasets: [{
          label: 'Missions',
          data: this.missionsData.map(mission => mission.duration),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      }
    });
  }

}
