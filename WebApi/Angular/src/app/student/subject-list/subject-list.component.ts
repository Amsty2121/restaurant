import { Course } from 'src/app/_models/Courses/Course';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/app/_infrastructure/models/PagedResult';
import { SubjectGridRow } from 'src/app/_models/Subjects/SubjectGridRow';
import { TableColumn } from 'src/app/_infrastructure/models/TableColumn';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestFilters } from 'src/app/_infrastructure/models/RequestFilters';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SubjectsService } from 'src/app/_services/subjects.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/_services/courses.service';
import { merge } from 'rxjs';
import { PaginatedRequest } from 'src/app/_infrastructure/models/PaginatedRequest';
import { Filter } from 'src/app/_infrastructure/models/Filter';
import { FilterLogicalOperators } from 'src/app/_infrastructure/models/FilterLogicalOperators';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit, AfterViewInit {
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
