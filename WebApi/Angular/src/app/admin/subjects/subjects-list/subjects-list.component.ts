import { CoursesService } from './../../../_services/courses.service';
import { Course } from './../../../_models/Courses/Course';
import { Filter } from './../../../_infrastructure/models/Filter';
import { SubjectsService } from './../../../_services/subjects.service';
import { SubjectGridRow } from './../../../_models/Subjects/SubjectGridRow';
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
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css'],
})
export class SubjectsListComponent implements OnInit, AfterViewInit {
  pagedSubjects!: PagedResult<SubjectGridRow>;

  tableColumns: TableColumn[] = [
    {
      name: 'SubjectName',
      index: 'SubjectName',
      displayName: 'Title',
      useInSearch: true,
    },
    {
      name: 'SubjectHometask',
      index: 'SubjectHometask',
      displayName: 'Hometask',
      useInSearch: true,
    },
    { name: 'Id', index: 'Id', displayName: 'Id' },
  ];

  courseId!: number;
  currentCourse!: Course;
  pageTitle!: string;

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters!: RequestFilters;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private subjectsService: SubjectsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {
    this.displayedColumns = this.tableColumns.map((column) => column.name);
    this.filterForm = this.formBuilder.group({
      subjectName: [''],
      subjectHometask: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
    });
    this.coursesService.getCourse(this.courseId).subscribe((course) => {
      this.currentCourse = course;
      this.pageTitle = this.currentCourse.courseName + ' subjects';
    });
  }

  ngAfterViewInit() {
    this.loadSubjectsFromApi();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadSubjectsFromApi();
    });
  }

  loadSubjectsFromApi() {
    const paginatedRequest = new PaginatedRequest(
      this.paginator,
      this.sort,
      this.requestFilters
    );
    this.subjectsService
      .getSubjectsPaged(paginatedRequest, this.courseId)
      .subscribe((pagedCourses: PagedResult<SubjectGridRow>) => {
        this.pagedSubjects = pagedCourses;
      });
  }

  openDialogForDeleting(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deleting subject',
        message: 'Are you sure to delete this subject?',
      },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.subjectsService.deleteSubject(id).subscribe(() => {
          this.loadSubjectsFromApi();

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
    this.loadSubjectsFromApi();
  }

  resetGrid() {
    this.requestFilters = {
      filters: [],
      logicalOperator: FilterLogicalOperators.And,
    };
    this.loadSubjectsFromApi();
  }

  filterSubjectsFromForm() {
    this.createFiltersFromForm();
    this.loadSubjectsFromApi();
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
