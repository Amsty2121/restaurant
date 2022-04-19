import { Ingredient} from '../_models/Ingredients/Ingredient';
import { IngredientStatus} from '../_models/IngredientStatuses/IngredientStatus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../_infrastructure/models/PaginatedRequest';
import { PagedResult } from '../_infrastructure/models/PagedResult';
import { IngredientGridRow } from '../_models/Ingredients//IngredientGridRow';


@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getIngredient(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.baseUrl + 'ingredient/' + id);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl + 'ingredient');
  }

  getIngredientsPaged(
    paginatedRequest: PaginatedRequest
  ): Observable<PagedResult<IngredientGridRow>> {
    return this.http.post<PagedResult<IngredientGridRow>>(
      this.baseUrl + 'ingredient/' + 'paginated-search',
      paginatedRequest
    );
  }

  deleteIngredient(id: number) {
    return this.http.delete(this.baseUrl + 'ingredient/' + id);
  }

  getAllStatuses(): Observable<IngredientStatus[]> {
    return this.http.get<IngredientStatus[]>(this.baseUrl + 'ingredient-status-list');
  }

  saveIngredient(ingredient: Ingredient): Observable<Ingredient> {
    if (ingredient.id > 0) {
      return this.updateIngredient(ingredient);
    }
    return this.createIngredient(ingredient);
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.patch<Ingredient>(
      this.baseUrl + 'ingredient/' + ingredient.id,
      ingredient
    );
  }
  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.baseUrl + 'ingredient/', ingredient);
  }
}
