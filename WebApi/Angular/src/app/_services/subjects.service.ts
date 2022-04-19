import { SubjectGridRow } from './../_models/Subjects/SubjectGridRow';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedRequest } from '../_infrastructure/models/PaginatedRequest';
import { PagedResult } from '../_infrastructure/models/PagedResult';
import { environment } from 'src/environments/environment';
import { Subject } from '../_models/Subjects/Subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSubjectsPaged(
    paginatedRequest: PaginatedRequest,
    courseId: number
  ): Observable<PagedResult<SubjectGridRow>> {
    return this.http.post<PagedResult<SubjectGridRow>>(
      this.baseUrl + 'subject/' + 'paginated-search/' + courseId,
      paginatedRequest
    );
  }

  getSubject(id: number) {
    return this.http.get<Subject>(this.baseUrl + 'subject/' + id);
  }

  saveSubject(subject: Subject): Observable<Subject> {
    if (subject.id > 0) {
      return this.updateSubject(subject);
    }
    return this.createSubject(subject);
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.patch<Subject>(
      this.baseUrl + 'subject/' + subject.id,
      subject
    );
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.baseUrl + 'subject/', subject);
  }

  deleteSubject(id: number) {
    return this.http.delete(this.baseUrl + 'subject/' + id);
  }
}
