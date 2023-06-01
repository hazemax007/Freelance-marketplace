import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image } from '../_models/Image';
import { Subscription } from 'rxjs';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})
export class AllImagesComponent implements OnInit,OnDestroy {

  images: Image[] = [];
  private imageSubscription: Subscription;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {

    this.imageService.getImages();
    this.imageSubscription = this.imageService
      .getProfilesStream()
      .subscribe((images: Image[]) => {
        this.images = images;
      });
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }

}
