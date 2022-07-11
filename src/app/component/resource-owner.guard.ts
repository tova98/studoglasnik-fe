import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { AdService } from '../service/ad.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceOwnerGuard implements CanActivate {
  constructor(public authService: AuthService, public adAService: AdService, public router: Router, public snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedInAdmin()) {
      return true;
    }
    const adId = Number(next.params['id'])
    return this.adAService.getAd(adId).pipe(map(ad => {
      if(this.authService.getCurrentUserId() == ad.contactUser.id) {
        return true;
      }

      this.snackBar.open("You are not the owner of this resource!", "❌", { duration: 5000, panelClass: ['snackbar-warn'], verticalPosition: 'top'});
      this.router.navigate(["/ads"]);
      return false;
    }));
  }
}