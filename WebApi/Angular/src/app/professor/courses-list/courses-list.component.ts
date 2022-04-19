import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/Courses/Course';
import { CoursesService } from 'src/app/_services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  courses!: Course[];
  username!: string | null;

  constructor(private courseService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
    this.courseService
      .getCoursesForProfessor(this.username)
      .subscribe((courses: Course[]) => {
        this.courses = courses;
      });
  }

  onCourseClick(courseId: number) {
    this.router.navigate(['/professor/course/' + courseId]);
  }
}
