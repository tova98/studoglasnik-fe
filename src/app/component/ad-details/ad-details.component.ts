import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Ad } from 'src/app/model/ad';
import { AdService } from 'src/app/service/ad.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;

  onUserPage = false;

  ad: Ad;
  @ViewChild('preview') preview: any;

  constructor(private route: ActivatedRoute, private adService: AdService, private authService: AuthService) {
    this.ad = new Ad();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adService.getAd(id).subscribe(ad => this.ad = ad);
  }

  setPreviewImage(pictureFilename: string) {
    this.preview.nativeElement.src = "http://localhost:8080/pictures/" + pictureFilename;
  }

  delete(adId: number) {
    
  }

  canManage(): boolean {
    if(this.authService.isLoggedInAdmin()) return true;
    if(this.onUserPage) return true;

    return false;
  }

}
