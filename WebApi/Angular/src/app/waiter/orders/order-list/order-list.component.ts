import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PagedResult } from 'src/app/_infrastructure/models/PagedResult';
import { TableColumn } from 'src/app/_infrastructure/models/TableColumn';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestFilters } from 'src/app/_infrastructure/models/RequestFilters';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { PaginatedRequest } from 'src/app/_infrastructure/models/PaginatedRequest';
import { Filter } from 'src/app/_infrastructure/models/Filter';
import { FilterLogicalOperators } from 'src/app/_infrastructure/models/FilterLogicalOperators';
import { ConfirmDialogComponent } from 'src/app/admin/shared/confirm-dialog/confirm-dialog.component';
import { OrderGridRow } from 'src/app/_models/Orders/OrderGridRow';
import { OrderService } from 'src/app/_services/order.service';
import { Order } from 'src/app/_models/Orders/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements AfterViewInit {
  pagedOrders!: PagedResult<OrderGridRow>;
  
  tableColumns: TableColumn[] = [
    {
      name: 'Dish',
      index: 'Dish',
      displayName: 'Dish',
    },
    {
      name: 'OrderNrPortions',
      index: 'OrderNrPortions',
      displayName: 'OrderNrPortions',
    },
    {
      name: 'OrderStatus',
      index: 'OrderStatus',
      displayName: 'OrderStatus',
    },
    {
      name: 'OrderDescription',
      index: 'OrderDescription',
      displayName: 'Description',
      useInSearch: true,
    },
    {
      name: 'Table',
      index: 'Table',
      displayName: 'Table',
    },
    {
      name: 'Waiter',
      index: 'Waiter',
      displayName: 'Waiter',
    },
    {
      name: 'Kitchener',
      index: 'Kitchener',
      displayName: 'Kitchener',
    },
    { name: 'Id', index: 'Id', displayName: 'Id' },
  ];

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters!: RequestFilters;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.displayedColumns = this.tableColumns.map((column) => column.name);
    this.filterForm = this.formBuilder.group({
      orderDescription: [''],
    });
  }

  chosed?:number;
  Chosed(value: Order):void{
        this.chosed = value.id;}

  ngAfterViewInit() {
    this.loadOrdersFromApi();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadOrdersFromApi();
    });
  }

  loadOrdersFromApi() {
    const paginatedRequest = new PaginatedRequest(
      this.paginator,
      this.sort,
      this.requestFilters
    );
    this.orderService
      .getOrdersPaged(paginatedRequest)
      .subscribe((pagedOrders: PagedResult<OrderGridRow>) => {
        this.pagedOrders = pagedOrders;
      });
  }

  openDialogForDeleting(Id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deleting order',
        message: 'Are you sure to delete this Order?',
      },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.orderService.deleteOrder(Id).subscribe(() => {
          this.loadOrdersFromApi();

          this.snackBar.open(
            'The item has been deleted successfully.',
            'Close',
            {
              duration: 1500,
            }
          );
        });
      }
    });
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.loadOrdersFromApi();
  }

  resetGrid() {
    this.requestFilters = {
      filters: [],
      logicalOperator: FilterLogicalOperators.And,
    };
    this.loadOrdersFromApi();
  }

  filterOrdersFromForm() {
    this.createFiltersFromForm();
    this.loadOrdersFromApi();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach((key) => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(
            (tableColumn) => tableColumn.name === key
          );
          const filter: Filter = {
            path: foundTableColumn!.index,
            value: controlValue,
          };
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters,
      };
    }
  }


  private createFiltersFromSearchInput() {
    const filterValue = this.searchInput.value.trim();
    if (filterValue) {
      const filters: Filter[] = [];
      this.tableColumns.forEach((column) => {
        if (column.useInSearch) {
          const filter: Filter = { path: column.index, value: filterValue };
          filters.push(filter);
        }
      });
      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.Or,
        filters,
      };
    } else {
      this.resetGrid();
    }
  }
}
