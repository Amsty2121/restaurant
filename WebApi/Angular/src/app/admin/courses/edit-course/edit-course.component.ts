import { Group } from './../../../_models/Groups/Group';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from './../../../_services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/_models/Courses/Course';
import { Professor } from 'src/app/_models/Professors/Professor';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  pageTitle!: string;
  courseForm!: FormGroup;
  professors!: Professor[];
  groups!: Group[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      if (objectId === 0) {
        this.pageTitle = 'Add Course:';
      } else {
        this.getCourse(objectId);
        this.pageTitle = 'Edit Course:';
      }
    });

    this.coursesService
      .getAllProfessors()
      .subscribe((professors: Professor[]) => {
        this.professors = professors;
      });

    this.coursesService.getAllGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });

    this.courseForm = this.fb.group({
      id: [objectId],
      courseName: [
        '',
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(3),
        ],
      ],
      courseDescription: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(3),
        ],
      ],
      groupsId: [''],
      professorsId: [''],
    });
  }

  get courseName() {
    return this.courseForm.get('courseName');
  }

  get courseDescription() {
    return this.courseForm.get('courseDescription');
  }

  getCourse(id: number): void {
    this.coursesService.getCourse(id).subscribe((course: Course) => {
      this.courseForm.patchValue({ ...course });
    });
  }

  saveCourse(): void {
    if (this.courseForm.dirty && this.courseForm.valid) {
      const courseToSave: Course = {
        ...this.courseForm.value,
      };
      this.coursesService
        .saveCourse(courseToSave)
        .subscribe(() => this.onSaveComplete());
      this.coursesService;
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate(['/admin/coursesList']);
  }
}
