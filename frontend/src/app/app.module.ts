import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MissionComponent } from './mission/mission.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  OAuthModule } from 'angular-oauth2-oidc';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { AddMissionComponent } from './add-mission/add-mission.component'
import { MatDialogModule } from '@angular/material/dialog';
import { EditMissionComponent } from './edit-mission/edit-mission.component'  
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplicationComponent } from './application/application.component';
import { ListApplicationComponent } from './list-application/list-application.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { ArchiveFormComponent } from './archive-form/archive-form.component';
import { AssignMissionComponent } from './assign-mission/assign-mission.component';
import { ListIntercontratsComponent } from './list-intercontrats/list-intercontrats.component';
import { RatingFormComponent } from './rating-form/rating-form.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MissionComponent,
    UpdateProfileComponent,
    MissionDetailsComponent,
    DashboardComponent,
    AddMissionComponent,
    EditMissionComponent,
    ApplicationComponent,
    ListApplicationComponent,
    ApplicationDetailsComponent,
    EmailFormComponent,
    ArchiveFormComponent,
    AssignMissionComponent,
    ListIntercontratsComponent,
    RatingFormComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //Ng2SearchPipeModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    SocialLoginModule
    //OAuthModule.forRoot()
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '657869156146-tib1g939ruq20jhlpm49ari5i87tllv7.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
