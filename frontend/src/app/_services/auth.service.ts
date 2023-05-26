import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username: string, password: string ): Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      username,password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + "/signup", {
      username,email,password
    }, httpOptions)
  }

  forgetPassword(email: any){
    return this.http.post(AUTH_API + "/forget-password",email)
  }

  resetPassword(token:string , password:any){
    return this.http.post(`${AUTH_API}/reset-password?token=${token}`,password)
  }
}
