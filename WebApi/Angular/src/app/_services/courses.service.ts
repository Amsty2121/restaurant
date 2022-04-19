import { Course } from '../_models/Courses/Course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../_infrastructure/models/PaginatedRequest';
import { PagedResult } from '../_infrastructure/models/PagedResult';
import { CourseGridRow } from '../_models/Courses/CourseGridRow';
import { Professor } from '../_models/Professors/Professor';
import { Group } from '../_models/Groups/Group';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(this.baseUrl + 'course/' + id);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + 'course');
  }

  getCoursesPaged(
    paginatedRequest: PaginatedRequest
  ): Observable<PagedResult<CourseGridRow>> {
    return this.http.post<PagedResult<CourseGridRow>>(
      this.baseUrl + 'course/' + 'paginated-search',
      paginatedRequest
    );
  }

  deleteCourse(id: number) {
    return this.http.delete(this.baseUrl + 'course/' + id);
  }

  getAllProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseUrl + 'professor');
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + 'group');
  }

  saveCourse(course: Course): Observable<Course> {
    if (course.id > 0) {
      return this.updateCourse(course);
    }
    return this.createCourse(course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.patch<Course>(
      this.baseUrl + 'course/' + course.id,
      course
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl + 'course/', course);
  }

  getCoursesForStudent(username: string | null): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.baseUrl + 'course/get-for-student?username=' + username
    );
  }

  getCoursesForProfessor(username: string | null): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.baseUrl + 'course/get-for-professor?username=' + username
    );
  }
}
