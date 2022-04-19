import { IngredientGridRow } from './../../../_models/Ingredients/IngredientGridRow';
import { IngredientService } from './../../../_services/ingredient.service';
import { DishGridRow } from './../../../_models/Dishes/DishGridRow';
import { DishService } from './../../../_services/dish.service';
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
import {MatMenuModule} from '@angular/material/menu';
import { Dish } from 'src/app/_models/Dishes/Dish';
import { Ingredient } from 'src/app/_models/Ingredients/Ingredient';
import { ActivatedRoute, Router } from '@angular/router';
import { DishStatusService } from 'src/app/_services/dish-status.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit,AfterViewInit {
  pagedDishes!: PagedResult<DishGridRow>;
  ingredients!: Ingredient[];

  tableColumns: TableColumn[] = [
    {
      name: 'DishName',
      index: 'DishName',
      displayName: 'Name',
      useInSearch: true,
    },
    {
      name: 'DishPrice',
      index: 'DishPrice',
      displayName: 'Price',
      useInSearch: true,
    },
    {
      name: 'DishDescription',
      index: 'DishDescription',
      displayName: 'Description',
      useInSearch: true,
    },
    {
      name: 'DishStatus',
      index: 'DishStatus',
      displayName: 'DishStatus',
      useInSearch: true,
    },
    {
      name: 'DishCategory',
      index: 'DishCategory',
      displayName: 'DishCategory',
      useInSearch: true,
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
    private dishService: DishService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ingredientService: IngredientService

  ) {
    this.displayedColumns = this.tableColumns.map((column) => column.name);
    this.filterForm = this.formBuilder.group({
      dishName: [''],
      dishDescription: [''],
      dishPrice:[''],
      dishCategory:[''],
      dishStatus:['']
    });
  }
  ngOnInit(): void {
    

      
  }

 /* getIngredient(id: number): void {
    this.ingredientService.getIngredient(id).subscribe((ingredient: Ingredient) => {
      this.ingredientForm.patchValue({ ...ingredient });
    });
  }*/

  chosed?:number;
  Chosed(value: Dish):void{
        this.chosed = value.id;
        console.log(this.chosed);}

  ngAfterViewInit() {
    this.loadDishesFromApi();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadDishesFromApi();
    });




  }

  loadDishesFromApi() {
    const paginatedRequest = new PaginatedRequest(
      this.paginator,
      this.sort,
      this.requestFilters
    );
    this.dishService
      .getDishesPaged(paginatedRequest)
      .subscribe((pagedDishes: PagedResult<DishGridRow>) => {
        this.pagedDishes = pagedDishes;
      });
  }

  openDialogForDeleting(Id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deleting dish',
        message: 'Are you sure to delete this Dish?',
      },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.dishService.deleteDish(Id).subscribe(() => {
          this.loadDishesFromApi();

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
    this.loadDishesFromApi();
  }

  resetGrid() {
    this.requestFilters = {
      filters: [],
      logicalOperator: FilterLogicalOperators.And,
    };
    this.loadDishesFromApi();
  }

  filterDishesFromForm() {
    this.createFiltersFromForm();
    this.loadDishesFromApi();
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
