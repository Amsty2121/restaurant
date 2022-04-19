import { CoursesService } from './../../../_services/courses.service';
import { Order } from './../../../_models/Orders/Order';
import { Filter } from './../../../_infrastructure/models/Filter';
import { OrdersService } from './../../../_services/orders.service';
import { OrderGridRow } from './../../../_models/Orders/OrderGridRow';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagedResult } from 'src/app/_infrastructure/models/PagedResult';
import { TableColumn } from 'src/app/_infrastructure/models/TableColumn';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestFilters } from 'src/app/_infrastructure/models/RequestFilters';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge } from 'rxjs';
import { PaginatedRequest } from 'src/app/_infrastructure/models/PaginatedRequest';
import { FilterLogicalOperators } from 'src/app/_infrastructure/models/FilterLogicalOperators';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit{
  pagedOrders!: PagedResult<OrderGridRow>;

  orderId!: number;
  currentOrder!: Order;
  orders!: Order[];
  pageTitle!: string;

  requestFilters!: RequestFilters;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private ordersService: OrdersService) {
    
  }

  ngOnInit() {
    this.ordersService.getAllOrders()
      .subscribe((orders:Order[])=>
      this.orders = orders);
  }

}
