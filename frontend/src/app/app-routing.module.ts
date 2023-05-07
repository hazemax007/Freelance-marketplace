import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './mission/mission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { EditMissionComponent } from './edit-mission/edit-mission.component';
import { ApplicationComponent } from './application/application.component';
import { ListApplicationComponent } from './list-application/list-application.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ListIntercontratsComponent } from './list-intercontrats/list-intercontrats.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component:ProfileComponent },
  { path:'updateProfile/:id', component:UpdateProfileComponent  },
  { path:'missions', component:MissionComponent  },
  { path:'dashboard', component:DashboardComponent },
  { path:'addMission', component:AddMissionComponent },
  { path:'editMission/:id', component:EditMissionComponent },
  { path:'application', component:ApplicationComponent },
  { path:'listApplications', component:ListApplicationComponent },
  { path:'application/:id' , component:ApplicationDetailsComponent},
  { path:'adminPanel', component:AdminPanelComponent},
  { path:'listIntercontrats', component:ListIntercontratsComponent},
  { path:'chat',  component:ChatComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
