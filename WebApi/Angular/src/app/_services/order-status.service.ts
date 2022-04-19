import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderStatus } from '../_models/OrderStatuses/OrderStatus';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    
  }

  getOrderStatus(id: number): Observable<OrderStatus> {
    return this.http.get<OrderStatus>(this.baseUrl + 'orderStatus/' + id);
  }

  getAllOrderStatuses(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(this.baseUrl + 'orderStatus');
  }
}
