import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl: string;

  constructor(private http: HttpClient) {
    this.categoriesUrl = 'http://localhost:8080/api/category';
  }

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl + `/all`);
  }

  getCategory(categoryId: number) {
    return this.http.get<Category>(this.categoriesUrl + `/${categoryId}`);
  }

  save(category: Category) {
    return this.http.post(this.categoriesUrl, category);
  }

  update(categoryId: number, category: Category) {
    return this.http.put(this.categoriesUrl + `/${categoryId}`, category);
  }

  delete(categoryId: number) {
    return this.http.delete(this.categoriesUrl + `/${categoryId}`);
  }
}
