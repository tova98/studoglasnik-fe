import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ad } from 'src/app/model/ad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private adsUrl: string;

  constructor(private http: HttpClient) {
    this.adsUrl = 'http://localhost:8080/api/ad';
  }

  getAd(adId: number): Observable<Ad> {
    return this.http.get<Ad>(this.adsUrl + `/${adId}`);
  }

  findAllFiltered(page: number, size: number, filter: any) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    return this.http.post(this.adsUrl + `/all`, filter, { params: params});
  }

  getAdsFilteredCount(filter: any) {
    return this.http.post<number>(this.adsUrl + `/all-count`, filter);
  }

  findAllFilteredByUser(userId: number, page: number, size: number, filter: any) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    return this.http.post(this.adsUrl + `/all/user/${userId}`, filter, { params: params});
  }

  getAdsFilteredByUserCount(userId: number, filter: any) {
    return this.http.post<number>(this.adsUrl + `/all-count/user/${userId}`, filter);
  }

  save(formData: FormData) {
    return this.http.post(this.adsUrl, formData);
  }

  update(adId: number, formData: FormData) {
    return this.http.put(this.adsUrl + `/${adId}`, formData);
  }

  delete(adId: number) {
    return this.http.delete(this.adsUrl + `/${adId}`);
  }
}
