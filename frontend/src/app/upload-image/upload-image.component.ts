import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Image } from '../_models/Image';
import { ImageService } from '../_services/image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  form: FormGroup;
  image: Image;
  imageData: string;
  userId:any

  constructor(private imageService: ImageService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.imageService.addImage(this.form.value.name, this.form.value.image, this.userId);
    this.form.reset();
    this.imageData = null;
  }

}
