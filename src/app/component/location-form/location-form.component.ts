import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/service/location.service';
import { Location } from 'src/app/model/location';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {

  isAddMode: boolean = true;
  locationForm!: FormGroup;

  locationId: number | undefined = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService) {
  }

  ngOnInit(): void {
    if(this.router.url.startsWith("/edit-location")) {
      this.isAddMode = false;
      this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.locationForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'googleMapsLink': new FormControl(null, Validators.required)
    })

    if(!this.isAddMode) {
      this.locationService.getLocation(this.locationId!).subscribe(location => {
        this.locationForm.patchValue(location);
      });
    }
  }

  onSubmit() {
    if(this.isAddMode) {
      this.locationService.save(this.locationForm.value).subscribe(() => this.gotoLocationList());
    } else {
      this.locationService.update(this.locationId!, this.locationForm.value).subscribe(() => this.gotoLocationList());
    }  
  }

  gotoLocationList() {
    this.router.navigate(['/locations']);
  }
}
