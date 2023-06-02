import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../_models/Rating';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/ratings/';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }

  getAllRatings():Observable<Rating[]>{
    return this.http.get<Rating[]>(API_URL);
  }

  saveRating(missionId:any,userId:any,rate:any){
    return this.http.post(API_URL + missionId + '/' + userId , rate)
  }

  getRating(missionId:any){
    return this.http.get(API_URL + missionId)
  }

  getAverageRating(projectId:any){
    return this.http.get(API_URL + 'average/' + projectId)
  }
}
