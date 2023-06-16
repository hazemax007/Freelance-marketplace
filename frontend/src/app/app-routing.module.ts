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
import { ListIntercontratsComponent } from './list-intercontrats/list-intercontrats.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { AllImagesComponent } from './all-images/all-images.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { ChatComponent } from './chat/chat.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';

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
  { path:'listIntercontrats', component:ListIntercontratsComponent},
  { path:'register-confirmation/:confirmationCode', component:RegisterConfirmationComponent},
  { path:'forget-password', component:ForgetPasswordComponent},
  { path:'reset-password', component:ResetPasswordComponent},
  { path:'allImages', component:AllImagesComponent },
  { path:'uploadImage/:id', component:UploadImageComponent},
  { path:'updateImage/:imageId/:userId', component:UpdateImageComponent},
  { path:'resumeList', component:ResumeListComponent},
  { path:'resumeDetails/:id',component:ResumeDetailsComponent},
  { path:'chat', component:ChatComponent},
  { path:'chatDetails/:id', component:ChatDetailsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
