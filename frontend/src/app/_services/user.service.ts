import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

const API_URL = 'http://localhost:8080/api/test/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get(API_URL)
  }

  public updateUser(user:User,id:any): Observable<User> {
    return this.http.put<User>(API_URL + id , user);
  }

  public deleteUser(id: any): Observable<void> {
    return this.http.delete<void>(API_URL  + id);
  }

  getUserById(id:any){
    return this.http.get<User>(API_URL + id);
  }

  defineIntercontrat(id:any){
    return this.http.post(API_URL + "intercontrat/" + id,{})
  }

  getAllIntercontrats():Observable<any>{
    return this.http.get(API_URL + 'intercontrat/getAll')
  }

  getIntercontratById(id:any){
    return this.http.get(API_URL + 'getIntercontrat/' + id)
  }

  deleteIntercontrat(id:any){
    return this.http.delete(API_URL + 'deleteIntercontrat/' + id)
  }

}
