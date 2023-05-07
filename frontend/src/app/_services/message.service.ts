import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  getMessages():Observable<any[]>{
    return this.http.get<any[]>(API_URL)
  }

  postMessage(sender:any,text:any):Observable<Message>{
    return this.http.post<Message>(API_URL,{ sender, text })
  }
  
}
