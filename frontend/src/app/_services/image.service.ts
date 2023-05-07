import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
  
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    return this.http.post(API_URL , formData, { headers });
  }

  getImage(id: any): Observable<Blob> {
    return this.http.get(API_URL + id, { responseType: 'blob' });
  }
  
}
