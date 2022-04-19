import { DishStatus } from '../_models/DishStatuses/DishStatus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishStatusService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    
  }

  getDishStatus(id: number): Observable<DishStatus> {
    return this.http.get<DishStatus>(this.baseUrl + 'dishStatus/' + id);
  }

  getAllDishStatuses(): Observable<DishStatus[]> {
    return this.http.get<DishStatus[]>(this.baseUrl + 'dishStatus');
  }
}
