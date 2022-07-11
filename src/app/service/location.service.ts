import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/model/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationsUrl: string;

  constructor(private http: HttpClient) {
    this.locationsUrl = 'http://localhost:8080/api/location';
  }

  findAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl + `/all`);
  }

  getLocation(locationId: number) {
    return this.http.get<Location>(this.locationsUrl + `/${locationId}`);
  }

  save(location: Location) {
    return this.http.post(this.locationsUrl, location);
  }

  update(locationId: number, location: Location) {
    return this.http.put(this.locationsUrl + `/${locationId}`, location);
  }

  delete(locationId: number) {
    return this.http.delete(this.locationsUrl + `/${locationId}`);
  }
}
