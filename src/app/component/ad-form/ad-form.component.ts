import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdService } from 'src/app/service/ad.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { Location } from 'src/app/model/location';
import { LocationService } from 'src/app/service/location.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { AdDto } from 'src/app/dto/ad.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ad } from 'src/app/model/ad';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditPicturesComponent } from '../edit-pictures/edit-pictures.component';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {

  isAddMode: boolean = true;
  adForm!: FormGroup;
  categories: Category[];
  locations: Location[];

  pictureFiles: string[];
  filesSelected: string = "No pictures selected";
  deleteFilesSelected: string = "No pictures selected";

  currentAdId: number | undefined = undefined;
  currentAdPictures: string[] = [];
  picturesToDelete: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private adService: AdService,
              private categoryService: CategoryService, private locationService: LocationService,
              private authService: AuthService, private userService: UserService, private dialog: MatDialog) {

    this.pictureFiles = [];
    this.categories = [];
    this.locations = [];

    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    })
    this.locationService.findAll().subscribe(data => {
      this.locations = data;
    })
  }

  ngOnInit(): void {
    if(this.router.url.startsWith("/edit-ad")) {
      this.isAddMode = false;
      this.currentAdId = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.adForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'duration': new FormControl(null, this.durationValidator()),
      'category': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required)
    });

    if(!this.isAddMode) {
      this.adService.getAd(this.currentAdId!).subscribe(ad => {
        this.adForm.patchValue(ad);
        this.currentAdPictures = ad.pictures;
      });
    }
  }

  onPictureChange(event: any) {
    this.pictureFiles = [];
    for(var i = 0; i < event.target.files.length; i++) {
      this.pictureFiles.push(event.target.files[i]);
    }
    
    if(this.pictureFiles.length == 1) {
      this.filesSelected = event.target.files[0].name;
    } else {
      this.filesSelected = this.pictureFiles.length + " files selected.";
    }
  }

  onSubmit() {
    if(this.isAddMode) {
      const userId = this.authService.getCurrentUserId();
      this.userService.getUser(userId).subscribe(user => {
        const ad: AdDto = this.adForm.value;
        ad.contactUser = user;

        let formData = this.createAdFormData(ad);
        this.adService.save(formData).subscribe(() => this.gotoAdList());
      });
    } else {
      const ad: Ad = this.adForm.value;
      ad.pictures = this.currentAdPictures.filter(pic => !this.picturesToDelete.includes(pic));

      let formData = this.createAdFormData(ad);
      this.adService.update(this.currentAdId!, formData).subscribe(() => this.gotoAdList());
    }
  }

  gotoAdList() {
    this.router.navigate(['/ads']);
  }

  compare(o1: Category | Location, o2: Category | Location) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  editPictures() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pictures: this.currentAdPictures,
      selectedPictures: this.picturesToDelete
    };
    let dialogRef = this.dialog.open(EditPicturesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((picturesToDelete: string[]) => {
      if(picturesToDelete) {
        this.picturesToDelete = picturesToDelete;
        if(this.picturesToDelete.length == 1) {
          this.deleteFilesSelected = "1 file selected.";
        } else {
          this.deleteFilesSelected = this.picturesToDelete.length + " files selected.";
        }
      }
    })
  }

  private durationValidator() {
    return this.isAddMode ? Validators.required : Validators.nullValidator;
  }

  private createAdFormData(ad: object): FormData {
    let formData = new FormData();
    for(var i = 0; i < this.pictureFiles.length; i++) {
      formData.append("picture", this.pictureFiles[i]);
    }
    formData.append("ad", new Blob([JSON.stringify(ad)], { type: 'application/json' }));
    return formData;
  }

}
