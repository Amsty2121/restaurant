import { Order } from '../_models/Orders/Order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../_infrastructure/models/PaginatedRequest';
import { PagedResult } from '../_infrastructure/models/PagedResult';
import { OrderGridRow } from '../_models/Orders/OrderGridRow';
import { Kitchener } from '../_models/Kitcheners/Kitchener';
import { Dish } from '../_models/Dishes/Dish';
import { OrderStatus } from '../_models/OrderStatuses/OrderStatus';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'order/' + id);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'order');
  }

  getOrdersPaged(
    paginatedRequest: PaginatedRequest
  ): Observable<PagedResult<OrderGridRow>> {
    return this.http.post<PagedResult<OrderGridRow>>(
      this.baseUrl + 'order/' + 'paginated-search',
      paginatedRequest
    );
  }

  deleteOrder(id: number) {
    return this.http.delete(this.baseUrl + 'order/' + id);
  }

  getAllKitcheners(): Observable<Kitchener[]> {
    return this.http.get<Kitchener[]>(this.baseUrl + 'kitchener');
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseUrl + 'dish');
  }

  saveOrder(order: Order): Observable<Order> {
    if (order.id > 0) {
      return this.updateOrder(order);
    }
    return this.createOrder(order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.patch<Order>(
      this.baseUrl + 'order/' + order.id,
      order
    );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'order/', order);
  }

  getStatusForOrder(orderId: number): Observable<OrderStatus> {
    return this.http.get<OrderStatus>(
      this.baseUrl + 'order-status/get-for-order?id=' + orderId
    );
  }

  getOrdersForKitchener(username: string | null): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseUrl + 'order/get-for-kitchener?username=' + username
    );
  }
}
