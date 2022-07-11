import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.css']
})
export class UserPictureComponent implements OnInit {

  pictureSelected: string = "No picture selected";
  selectedPicture = undefined;

  constructor(public dialogRef: MatDialogRef<UserPictureComponent>) {
  }

  ngOnInit(): void {
  }

  onPictureChange(event: any) {
    this.pictureSelected = event.target.files[0].name;
    this.selectedPicture = event.target.files[0];
  }

  changePicture() {
    this.dialogRef.close(this.selectedPicture);
  }

}
