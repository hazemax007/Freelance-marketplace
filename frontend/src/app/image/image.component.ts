import { Component, OnInit } from '@angular/core';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  file: File;
  imageUrl: string = null;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  upload(): void {
    if (this.file) {
      this.imageService.uploadImage(this.file).subscribe(
        image => {
          console.log(image);
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrl = reader.result as string;
          };
          reader.readAsDataURL(image);
        },
        error => {
          console.log('Error uploading image:', error);
        }
      );
    }
  }

}
