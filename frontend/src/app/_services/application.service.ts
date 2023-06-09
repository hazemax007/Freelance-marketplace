import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../_models/Application';
import { Resume } from '../_models/Resume';

const API_URL = 'http://localhost:8080/api/test/applications/';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http:HttpClient) { }

  getAllApplications():Observable<Application[]>{
    return this.http.get<Application[]>(API_URL)
  }

  addApplication(userId:any,missionId:any,formData:FormData){
    return this.http.post(API_URL+userId+'/'+missionId,formData)
  }

  getApplicationById(id:any):Observable<Application>{
    return this.http.get<Application>(API_URL+id)
  }

  deleteApplication(id:any){
    return this.http.delete(API_URL+id)
  }

  sendEmailDecision( data : { email: any, content: any }){
    return this.http.post(API_URL+'sendEmail',data)
  }

  getResume(filepath:any){
    return this.http.get(API_URL+'getResume/'+filepath,{ responseType: 'blob' })
  }

  resumeParser(formData:FormData){
    return this.http.post('http://localhost:8080/api/test/resume',formData)
  }

  getAllResumes():Observable<Resume[]>{
    return this.http.get<Resume[]>('http://localhost:8080/api/test/resume')
  }
}
