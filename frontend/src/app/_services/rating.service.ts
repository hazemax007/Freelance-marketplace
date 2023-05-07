import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../_models/Rating';

const API_URL = 'http://localhost:8080/api/test/ratings/';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }

  saveRating(userId:any,ratedUserId:any,rate:any){
    return this.http.post(API_URL + userId + '/' + ratedUserId , rate)
  }

  getRating(ratedUserId:any){
    return this.http.get(API_URL + ratedUserId)
  }
}
