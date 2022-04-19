import { DishCategory } from '../_models/DishCategories/DishCategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishCategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    
  }

  getDishCategory(id: number): Observable<DishCategory> {
    return this.http.get<DishCategory>(this.baseUrl + 'dishCategory/' + id);
  }

  getAllDishCategories(): Observable<DishCategory[]> {
    return this.http.get<DishCategory[]>(this.baseUrl + 'dishCategory');
  }
}
