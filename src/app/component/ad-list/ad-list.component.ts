import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/model/ad';
import { Category } from 'src/app/model/category';
import { Location } from 'src/app/model/location';
import { AdService } from 'src/app/service/ad.service';
import { CategoryService } from 'src/app/service/category.service';
import { LocationService } from 'src/app/service/location.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/component/delete-dialog/delete-dialog.component';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;

  filterForm!: FormGroup;
  currentFilter: any = {};

  allAds: Ad[] = [];
  ads: Ad[] = [];

  categories: Category[];
  locations: Location[];

  onUserPage: boolean;

  length = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private router: Router, private adService: AdService, private categoryService: CategoryService, 
              private locationService: LocationService, public authService: AuthService,
              public dialog: MatDialog) {
    
    this.categories = [];
    this.locations = [];

    this.onUserPage = false;

    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    })

    this.locationService.findAll().subscribe(data => {
      this.locations = data;
    })
  }

  ngOnInit(): void {
    if(this.router.url == "/ads") {
      this.loadAdsFiltered(0, this.pageSize);
    } else if(this.router.url == "/ads-user") {
      this.onUserPage = true;
      this.loadAdsFilteredByUser(0, this.pageSize);
    }

    this.filterForm = new FormGroup({
      'title': new FormControl(null),
      'category': new FormControl(null),
      'location': new FormControl(null),
      'priceFrom': new FormControl(null),
      'priceTo': new FormControl(null),
      'expired': new FormControl(null)
    });
  }

  changePage(event: any) {
    this.pageSize = event.pageSize;
    if(!this.onUserPage) {
      this.loadAdsFiltered(event.pageIndex, event.pageSize);
    } else {
      this.loadAdsFilteredByUser(event.pageIndex, event.pageSize);
    }
  }

  onFilter() {
    this.currentFilter = this.filterForm.value;
    if(!this.onUserPage) {
      this.loadAdsFiltered(0, this.pageSize);
    } else {
      this.loadAdsFilteredByUser(0, this.pageSize);
    }
  }

  loadAdsFiltered(page: number, size: number) {
    this.adService.getAdsFilteredCount(this.currentFilter).subscribe(count => {
      this.length = count;
    });

    this.adService.findAllFiltered(page, size, this.currentFilter).subscribe((response: any) => {
      this.ads = response.content;
    });
  }

  loadAdsFilteredByUser(page: number, size: number) {
    const userId = this.authService.getCurrentUserId()!;

    this.adService.findAllFilteredByUser(userId, page, size, this.currentFilter).subscribe((response: any) => {
      this.ads = response.content;
    });

    this.adService.getAdsFilteredByUserCount(userId, this.currentFilter).subscribe(count => {
      this.length = count;
    });
  }

  delete(adId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      info: 'ad',
      id: adId
    };
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((adId: number) => {
      if(adId) {
        this.adService.delete(adId).subscribe(() =>  {
          this.ads = this.ads.filter(a => a.id !== adId);
        })
      }
    })
  }

  canManage(): boolean {
    if(this.authService.isLoggedInAdmin()) return true;
    if(this.onUserPage) return true;

    return false;
  }

}
