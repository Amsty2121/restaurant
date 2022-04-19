import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/_services/courses.service';
import { Course } from 'src/app/_models/Courses/Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses!: Course[];
  username!: string | null;

  constructor(private courseService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
    this.courseService
      .getCoursesForStudent(this.username)
      .subscribe((courses: Course[]) => {
        this.courses = courses;
      });
  }

  onCourseClick(courseId: number) {
    this.router.navigate(['/student/course/' + courseId]);
  }
}
