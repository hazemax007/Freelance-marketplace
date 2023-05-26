import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MissionService } from '../_services/mission.service';
import { User } from '../_models/User';
import { Mission } from '../_models/Mission';
import { MatDialog } from '@angular/material/dialog';
import { EditMissionComponent } from '../edit-mission/edit-mission.component';
import { CoreService } from '../_services/core.service';
import { ApplicationService } from '../_services/application.service';
import { Application } from '../_models/Application';
import { error } from 'console';
import { Router } from '@angular/router';
import { ArchiveFormComponent } from '../archive-form/archive-form.component';
import { AssignMissionComponent } from '../assign-mission/assign-mission.component';
import { Chart, ChartType, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  displayedUserColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'birthdate', 'phonenumber','actions'];
  displayedMissionColumns: string[] = ['title', 'field', 'technology', 'duration', 'actions'];
  displayedColumnsApplications: string[] = ['name','startDate','actions']
  listMissions :Mission[]
  listUsers:User[]
  listApplications:Application[]
  searchUser=''
  searchMission=''
  searchApplication=''
  mission:Mission
  @ViewChild('missionsChartCanvas', { static: true }) missionsChartCanvas: ElementRef;
  @ViewChild('userPieChartCanvas') userPieChartCanvas!: ElementRef;
  @ViewChild('missionsCategoryPieChartCanvas') missionsCategoryPieChartCanvas!: ElementRef;
  @ViewChild('userAgeChartCanvas') userAgeChartCanvas!: ElementRef;
  chartUser!: any
  chartMission!:any
  chartUserAge!:any
  missionsData: any[] = [];
  
  

  constructor(private userService:UserService,
    private missionService:MissionService,
    private dialog: MatDialog,
    private coreService:CoreService,
    private applicationService:ApplicationService,
    private router:Router) { }

  ngOnInit(): void {
    this.getListUsers()
    this.getListMissions()
    this.getListApplications()

  }

  ngAfterViewInit(): void {
    const ctx1: CanvasRenderingContext2D = this.missionsChartCanvas.nativeElement.getContext('2d');
    

    this.missionService.getAllMissions()
      .subscribe(missions => {
        this.missionsData = missions;
        this.createChart(ctx1);
      });
      this.fetchUserRolesData()
      this.fetchMissionCategoryData()
      this.fetchUserAgeData()
  }

  createChart(ctx: CanvasRenderingContext2D) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.missionsData.map(mission => mission.title),
        datasets: [{
          label: 'Duration',
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

  fetchUserAgeData(): void {
    this.userService.getAllUsers().subscribe(users => {
      const ageCategories: string[] = [];
      const userCounts: number[] = [];

      // Define the age ranges (modify as needed)
      const ageRanges = [
        { label: "20's", min: 20, max: 29 },
        { label: "30's", min: 30, max: 39 },
        { label: "40's", min: 40, max: 49 },
        // Add more age ranges as needed
      ];

      // Initialize count for each age range
      ageRanges.forEach(range => {
        ageCategories.push(range.label);
        userCounts.push(0);
      });

      // Calculate age and count users in each age range
      const today = new Date();
      users.forEach((user: { birthdate: string | number | Date; }) => {
        const birthDate = new Date(user.birthdate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const ageRange = ageRanges.find(range => age >= range.min && age <= range.max);
        if (ageRange) {
          const rangeIndex = ageCategories.indexOf(ageRange.label);
          userCounts[rangeIndex]++;
        }
      });

      this.createUserAgeBarChart(ageCategories, userCounts);
    });
  }

  fetchUserRolesData(): void {
    this.userService.getAllUsers().subscribe(users => {
      const rolesCountMap = new Map<string, number>();
      users.forEach((user: { roles: any[]; }) => {
        user.roles.forEach(role => {
          if (rolesCountMap.has(role)) {
            rolesCountMap.set(role, rolesCountMap.get(role)! + 1);
          } else {
            rolesCountMap.set(role, 1);
          }
        });
      });
  
      const labels = ['admin','user','freelancer','esn','company']
      const data = Array.from(rolesCountMap.values());
      this.createUserPieChart(labels, data);
    });
  }

  fetchMissionCategoryData(): void {
    this.missionService.getAllMissions().subscribe(missions => {
      const categoryCountMap = new Map<string, number>();
      missions.forEach((mission: { field: any; }) => {
        const category = mission.field;
        if (categoryCountMap.has(category)) {
          categoryCountMap.set(category, categoryCountMap.get(category)! + 1);
        } else {
          categoryCountMap.set(category, 1);
        }
      });

      const labels = ['web development','data science','devops']
      const data = Array.from(categoryCountMap.values());
      this.createMissionPieChart(labels, data);
    });
  }

  createUserAgeBarChart(labels: string[], data: number[]): void {
    const ctx = this.userAgeChartCanvas.nativeElement.getContext('2d');
    this.chartUserAge = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'User Age',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }],
      },
      options: {} // Add any additional options here
    });
  }

  createUserPieChart(labels: string[], data: number[]): void {
  const ctx = this.userPieChartCanvas.nativeElement.getContext('2d');
  this.chartUser = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'User Roles',
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 1)', // Blue color for admins
          'rgba(255, 99, 132, 1)', // Red color for regular users
          'rgba(176, 97, 176, 1)',
          'rgba(115, 140, 115, 1)',
          'rgba(255, 192, 41, 1)',
          // Add more colors as needed
        ],
      }],
    },
  });
}

createMissionPieChart(labels: string[], data: number[]): void {
  const ctx = this.missionsCategoryPieChartCanvas.nativeElement.getContext('2d');
  this.chartMission = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Mission Categories',
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(176, 97, 176, 1)',
          // Add more colors as needed
        ],
      }],
    },
    options: {} // Add any additional options here
  });
}


  getListUsers(){
    this.userService.getAllUsers().subscribe(
      data => {
        this.listUsers = data
        console.log(this.listUsers)
      },
      error => {
        console.log(error)
      }
    )
  }

  getListMissions(){
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

  getListApplications(){
    this.applicationService.getAllApplications().subscribe(
      data => {
        this.listApplications = data
        console.log(this.listApplications)
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteMission(id:any) {
    this.missionService.deleteMission(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Mission deleted!', 'done');
        this.getListMissions();
      },
      error: console.log,
    });
  }

  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe({
      next:(res) => {
        this.coreService.openSnackBar('User deleted!', 'done')
        this.getListUsers()
      },
      error: console.log
    })
  }

  deleteApplication(id:any){
    this.applicationService.deleteApplication(id).subscribe({
      next:() => {
        this.coreService.openSnackBar('Application deleted!', 'done')
        this.getListApplications()
      }
    })
  }

  goToApplication(id:any){
    this.router.navigate(['application',id])
  }

  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EditMissionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EditMissionComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions();
        }
      },
    });
  }

  openArchiveForm(missionId:any) {
    const dialogRef = this.dialog.open(ArchiveFormComponent,
      {
        data: {
          missionId:missionId
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions()
        }
      },
    });
  }

  openAssignProjectForm(missionId:any) {
    const dialogRef = this.dialog.open(AssignMissionComponent,
      {
        data: {
          missionId:missionId
        }
      });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListMissions();
        }
      },
    });
  }

  intercontrat(id:any){
    this.userService.defineIntercontrat(id).subscribe(
      (data) => {
        console.log("success")
      },error =>{
        console.log(error)
      }
    )
  }


}
