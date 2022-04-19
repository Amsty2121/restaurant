import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../_infrastructure/models/PaginatedRequest';
import { PagedResult } from '../_infrastructure/models/PagedResult';
import { Waiter } from '../_models/Waiters/Waiter';
import { TableStatus } from '../_models/TableStatuses/TableStatus';
import { Order } from '../_models/Orders/Order';
import { Table } from '../_models/Tables/Table';
import { TableGridRow } from '../_models/Tables/TableGridRow';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTable(id: number): Observable<Table> {
    return this.http.get<Table>(this.baseUrl + 'table/' + id);
  }

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.baseUrl + 'table');
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'order');
  }

  getTablesPaged(
    paginatedRequest: PaginatedRequest
  ): Observable<PagedResult<TableGridRow>> {
    return this.http.post<PagedResult<TableGridRow>>(
      this.baseUrl + 'table/' + 'paginated-search',
      paginatedRequest
    );
  }

  deleteTable(id: number) {
    return this.http.delete(this.baseUrl + 'table/' + id);
  }

  getOrdersByTableId(id:number) :Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl+'table/'+id +'/orders');
  }

  getAllWaiters(): Observable<Waiter[]> {
    return this.http.get<Waiter[]>(this.baseUrl + 'waiter');
  }

  getAllTableStatuses(): Observable<TableStatus[]> {
    return this.http.get<TableStatus[]>(this.baseUrl + 'tableStatus');
  }

  saveTable(table: Table): Observable<Table> {
    if (table.id > 0) {
      return this.updateTable(table);
    }
    return this.createTable(table);
  }

  updateTable(table: Table): Observable<Table> {
    return this.http.patch<Table>(
      this.baseUrl + 'table/' + table.id,
      table
    );
  }

  createTable(table: Table): Observable<Table> {
    return this.http.post<Table>(this.baseUrl + 'table/', table);
  }
}
