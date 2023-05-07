import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archive } from '../_models/Archive';

const API_URL = 'http://localhost:8080/api/test/archive/';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http:HttpClient) { }

  addArchiveMission(archive:Archive,missionId:any):Observable<Archive>{
    return this.http.post<Archive>(API_URL+missionId,archive)
  }
}
