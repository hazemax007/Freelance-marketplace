import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Image } from '../_models/Image';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api/test/images/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient,
    private router:Router) { }

  private images: Image[] = [];
  private images$ = new Subject<Image[]>();

  getImages() {
    this.http
      .get<{ images: Image[] }>(API_URL)
      .pipe(
        map((imageData) => {
          return imageData.images;
        })
      )
      .subscribe((images) => {
        this.images = images;
        this.images$.next(this.images);
      });
  }

  getProfilesStream() {
    return this.images$.asObservable();
  }

  addImage(name: string, image: File , id:any): void {
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("image", image, name);
    this.http
      .post<{ image: Image }>(API_URL + id, imageData)
      .subscribe((imageData) => {
        const image: Image = {
          _id: imageData.image._id,
          name: name,
          imagePath: imageData.image.imagePath,
        };
        this.images.push(image);
        this.images$.next(this.images);
        this.router.navigate(['/profile'])
      });
  }

  updateImage(name: string, image: File , imageId:any , userId:any): void{
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("image", image, name);
    this.http
      .put<{ image: Image }>(API_URL + imageId + "/" + userId, imageData)
      .subscribe((imageData) => {
        const image: Image = {
          _id: imageData.image?._id,
          name: name,
          imagePath: imageData.image?.imagePath,
        };
        this.images.push(image);
        this.images$.next(this.images);
      });
  }
  
}
