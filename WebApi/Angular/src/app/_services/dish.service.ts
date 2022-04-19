import { Dish } from '../_models/Dishes/Dish';
import { DishGridRow } from '../_models/Dishes/DishGridRow';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { identity, Observable } from 'rxjs';
import { PaginatedRequest } from '../_infrastructure/models/PaginatedRequest';
import { PagedResult } from '../_infrastructure/models/PagedResult';

import { Professor } from '../_models/Professors/Professor';
import { Group } from '../_models/Groups/Group';
import { Ingredient } from '../_models/Ingredients/Ingredient';
import { DishCategory } from '../_models/DishCategories/DishCategory';
import { DishStatus } from '../_models/DishStatuses/DishStatus';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.baseUrl + 'dish/' + id);
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseUrl + 'dish');
  }

  getDishesPaged(
    paginatedRequest: PaginatedRequest
  ): Observable<PagedResult<DishGridRow>> {
    return this.http.post<PagedResult<DishGridRow>>(
      this.baseUrl + 'dish/' + 'paginated-search',
      paginatedRequest
    );
  }

  deleteDish(id: number) {
    return this.http.delete(this.baseUrl + 'dish/' + id);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl + 'ingredient');
  }

  getAllDishCategories(): Observable<DishCategory[]> {
    return this.http.get<DishCategory[]>(this.baseUrl + 'dishCategory');
  }

  getAllDishStatuses(): Observable<DishStatus[]> {
    return this.http.get<DishStatus[]>(this.baseUrl + 'dishStatus');
  }

  saveDish(dish: Dish): Observable<Dish> {
    if (dish.id > 0) {
      return this.updateDish(dish);
    }
    return this.createDish(dish);
  }

  updateDish(dish: Dish): Observable<Dish> {
    return this.http.patch<Dish>(
      this.baseUrl + 'dish/' + dish.id,
      dish
    );
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.baseUrl + 'dish/', dish);
  }

  getIngredientsByDishId(id:number) :Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl+'dish/'+id +'/ingredients');
  }


  /*getIngredientsForDish(id: string | null): Observable<Dish[]> {
    return this.http.get<Dish[]>(
      this.baseUrl + 'dish/get-for-dish?id=' + id
    );
  }*/
}
