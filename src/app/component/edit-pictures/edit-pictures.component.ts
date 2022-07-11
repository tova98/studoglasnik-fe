import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-pictures',
  templateUrl: './edit-pictures.component.html',
  styleUrls: ['./edit-pictures.component.css']
})
export class EditPicturesComponent implements OnInit {

  deleteList: string[] = []

  constructor(public dialogRef: MatDialogRef<EditPicturesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.deleteList = this.data.selectedPictures;
  }

  saveChanges() {
    this.dialogRef.close(this.deleteList);
  }

  onPictureSelect(event: any, picture: string) {
    if(this.deleteList.includes(picture)) {
      this.deleteList = this.deleteList.filter(pic => pic !== picture);
    } else {
      this.deleteList.push(picture);
    }

    const classList = event.target.classList;
    if(classList.contains('border-red')) {
      classList.remove('border-red');
    } else {
      classList.add('border-red');
    }
  }

}
