import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from '../_models/Mission';

const API_URL = 'http://localhost:8080/api/test/projects/';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http:HttpClient) { }

  getAllMissions():Observable<any>{
    return this.http.get(API_URL)
  }

  getMissionById(id:any):Observable<Mission>{
    return this.http.get<Mission>(API_URL+id , {responseType:'json'})
  }

  addMission(mission:Mission):Observable<Mission>{
    return this.http.post<Mission>(API_URL,mission)
  }

  updateMission(mission:Mission,id:any):Observable<Mission>{
    return this.http.put<Mission>(API_URL+id,mission)
  }

  deleteMission(id:any):Observable<void>{
    return this.http.delete<void>(API_URL+id)
  }
}
