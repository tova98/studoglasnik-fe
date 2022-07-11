import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Location } from 'src/app/model/location';
import { LocationService } from 'src/app/service/location.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;

  locations: Location[] = [];

  constructor(private locationService: LocationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.locationService.findAll().subscribe(data => {
      this.locations = data;
    })
  }

  delete(locationId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      info: 'location',
      id: locationId
    };
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((locationId: number) => {
      if(locationId) {
        this.locationService.delete(locationId).subscribe(res => {
          this.locations = this.locations.filter(l => l.id !== locationId);
        })
      }
    })
  }
}
