import { Order } from './../../../_models/Orders/Order';
import { OrdersService } from './../../../_services/orders.service';
import { OrderGridRow } from './../../../_models/Orders/OrderGridRow';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/app/_infrastructure/models/PagedResult';
import { RequestFilters } from 'src/app/_infrastructure/models/RequestFilters';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  pagedOrders!: PagedResult<OrderGridRow>;

  orderId!: number;
  currentOrder!: Order;
  orders!: Order[];
  pageTitle!: string;

  requestFilters!: RequestFilters;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService
      .getAllOrders()
      .subscribe((orders: Order[]) => (this.orders = orders));
  }
}
