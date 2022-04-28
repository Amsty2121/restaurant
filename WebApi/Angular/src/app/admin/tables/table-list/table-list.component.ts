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
import { TableGridRow } from 'src/app/_models/Tables/TableGridRow';
import { TableService } from 'src/app/_services/table.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements AfterViewInit {
  pagedTables!: PagedResult<TableGridRow>;

  tableColumns: TableColumn[] = [
    {
      name: 'TableNumber',
      index: 'TableNumber',
      displayName: 'TableNumber',
    },
    {
      name: 'TableDescription',
      index: 'TableDescription',
      displayName: 'Description',
      useInSearch: true,
    },
    {
      name: 'Waiter',
      index: 'Waiter',
      displayName: 'Waiter',
    },
    {
      name: 'TableStatus',
      index: 'TableStatus',
      displayName: 'TableStatus',
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
    private tableService: TableService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.displayedColumns = this.tableColumns.map((column) => column.name);
    this.filterForm = this.formBuilder.group({
      tableDescription: [''],
    });
  }

  ngAfterViewInit() {
    this.loadTablesFromApi();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadTablesFromApi();
    });
  }

  loadTablesFromApi() {
    const paginatedRequest = new PaginatedRequest(
      this.paginator,
      this.sort,
      this.requestFilters
    );
    this.tableService
      .getTablesPaged(paginatedRequest)
      .subscribe((pagedTables: PagedResult<TableGridRow>) => {
        this.pagedTables = pagedTables;
      });
  }

  openDialogForDeleting(Id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deleting table',
        message: 'Are you sure to delete this Table?',
      },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.tableService.deleteTable(Id).subscribe(() => {
          this.loadTablesFromApi();

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
    this.loadTablesFromApi();
  }

  resetGrid() {
    this.requestFilters = {
      filters: [],
      logicalOperator: FilterLogicalOperators.And,
    };
    this.loadTablesFromApi();
  }

  filterTablesFromForm() {
    this.createFiltersFromForm();
    this.loadTablesFromApi();
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
