import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Message } from '../_models/Message';

const API_URL = 'http://localhost:8080/api/test/message/';

@Injectable({
  providedIn: 'root'
})
export class MessageService {



  constructor(private http:HttpClient) { 
  }

  postMessage(message:Message, senderId:any, receiverId:any){
    return this.http.post(API_URL + senderId+'/'+receiverId,message)
  }

  getAllMessages():Observable<Message[]>{
    return this.http.get<Message[]>(API_URL)
  }

  getCurrentMessages(senderId:any,receiverId:any):Observable<Message[]>{
    return this.http.get<Message[]>(API_URL+'chatMessages/'+senderId+'/'+receiverId)
  }
  
  
}
