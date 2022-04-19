import { SubjectsService } from './../../../_services/subjects.service';
import { CoursesService } from './../../../_services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/_models/Subjects/Subject';
import { Course } from 'src/app/_models/Courses/Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css'],
})
export class EditSubjectComponent implements OnInit {
  pageTitle!: string;
  subjectForm!: FormGroup;
  currentSubject!: Subject;
  courses!: Course[];
  currentCourseId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private router: Router
  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      if (objectId === 0) {
        this.pageTitle = 'Add Subject:';
      } else {
        this.getSubject(objectId);
        this.pageTitle = 'Edit Subject:';
      }
    });
    this.coursesService.getAllCourses().subscribe((courses: Course[]) => {
      this.courses = courses;
    });

    this.subjectForm = this.fb.group({
      id: [objectId],
      subjectName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      subjectHometask: [
        '',
        [Validators.minLength(3), Validators.maxLength(500)],
      ],
      subjectText: ['', [Validators.minLength(3), Validators.maxLength(4000)]],
      courseId: [''],
    });
  }

  getSubject(id: number): void {
    this.subjectsService.getSubject(id).subscribe((subject: Subject) => {
      this.subjectForm.patchValue({ ...subject });
      this.currentCourseId = subject.courseId;
    });
  }

  saveSubject(): void {
    if (this.subjectForm.dirty && this.subjectForm.valid) {
      const subjectToSave: Subject = {
        ...this.subjectForm.value,
      };
      this.subjectsService
        .saveSubject(subjectToSave)
        .subscribe(() => this.onSaveComplete());
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.subjectForm.reset();
    this.router.navigate([
      '/admin/coursesList/subjects/',
      this.currentCourseId,
    ]);
  }

  get courseIdControl() {
    return this.subjectForm.get('courseId');
  }
  get subjectNameControl() {
    return this.subjectForm.get('subjectName');
  }
  get subjectHometaskControl() {
    return this.subjectForm.get('subjectHometask');
  }
  get subjectTextControl() {
    return this.subjectForm.get('subjectText');
  }
}
