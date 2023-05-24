import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArchiveService } from '../_services/archive.service';
import { CoreService } from '../_services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-form',
  templateUrl: './archive-form.component.html',
  styleUrls: ['./archive-form.component.css']
})
export class ArchiveFormComponent implements OnInit {

  archiveForm:UntypedFormGroup

  constructor(private builder:UntypedFormBuilder,
    public dialogRef: MatDialogRef<ArchiveFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { missionId: any },
    private archiveService:ArchiveService,
    private coreService:CoreService,
    private router:Router) {
    this.archiveForm = this.builder.group({
      remarque:['',Validators.required],
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.archiveForm.valid) {
      if (this.data) {
        this.archiveService
          .addArchiveMission(this.archiveForm.value,this.data.missionId)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Mission archived!', 'done');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
    }
  }

  goToList(){
    this.router.navigate(['/dashboard'])
  }

}
