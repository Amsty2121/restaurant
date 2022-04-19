import { IngredientStatus } from '../_models/IngredientStatuses/IngredientStatus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientStatusService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    
  }

  getIngredientStatus(id: number): Observable<IngredientStatus> {
    return this.http.get<IngredientStatus>(this.baseUrl + 'ingredientStatus/' + id);
  }

  getAllIngredientStatuses(): Observable<IngredientStatus[]> {
    return this.http.get<IngredientStatus[]>(this.baseUrl + 'ingredientStatus');
  }
}
