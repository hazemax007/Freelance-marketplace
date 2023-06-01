import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Image } from '../_models/Image';
import { ImageService } from '../_services/image.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  form: FormGroup;
  image: Image;
  imageData: string;
  imageId:any
  userId:any

  constructor(private imageService: ImageService,
    private route:ActivatedRoute,
    private router:Router,
    //public dialogRef: MatDialogRef<UpdateImageComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: { imageId: any , userId:any}
    ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId']
    this.imageId = this.route.snapshot.params['imageId']
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
    //console.log(this.data.userId)
    console.log(this.userId)
    console.log(this.imageId)
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
    this.imageService.updateImage(this.form.value.name, this.form.value.image,this.imageId,this.userId);
    this.form.reset();
    this.imageData = null;
  }

}
