import { CourseGridRow } from './../../../../_models/Courses/CourseGridRow';
import { CoursesService } from './../../../../_services/courses.service';
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

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements AfterViewInit {
  pagedCourses!: PagedResult<CourseGridRow>;

  tableColumns: TableColumn[] = [
    {
      name: 'CourseName',
      index: 'CourseName',
      displayName: 'Name',
      useInSearch: true,
    },
    {
      name: 'CourseDescription',
      index: 'CourseDescription',
      displayName: 'Description',
      useInSearch: true,
    },
    {
      name: 'Professors',
      index: 'Professors',
      displayName: 'Professors',
    },
    {
      name: 'Groups',
      index: 'Groups',
      displayName: 'Groups',
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
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.displayedColumns = this.tableColumns.map((column) => column.name);
    this.filterForm = this.formBuilder.group({
      courseName: [''],
      courseDescription: [''],
    });
  }

  ngAfterViewInit() {
    this.loadCoursesFromApi();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadCoursesFromApi();
    });
  }

  loadCoursesFromApi() {
    const paginatedRequest = new PaginatedRequest(
      this.paginator,
      this.sort,
      this.requestFilters
    );
    this.coursesService
      .getCoursesPaged(paginatedRequest)
      .subscribe((pagedCourses: PagedResult<CourseGridRow>) => {
        this.pagedCourses = pagedCourses;
      });
  }

  openDialogForDeleting(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deleting course',
        message: 'Are you sure to delete this course?',
      },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.coursesService.deleteCourse(id).subscribe(() => {
          this.loadCoursesFromApi();

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
    this.loadCoursesFromApi();
  }

  resetGrid() {
    this.requestFilters = {
      filters: [],
      logicalOperator: FilterLogicalOperators.And,
    };
    this.loadCoursesFromApi();
  }

  filterCoursesFromForm() {
    this.createFiltersFromForm();
    this.loadCoursesFromApi();
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
