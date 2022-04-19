import { SubjectDetailedComponent } from './subject-detailed/subject-detailed.component';
import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'coursesList',
        component: CourseListComponent,
      },
      {
        path: 'course/:id',
        component: SubjectListComponent,
      },
      {
        path: 'course/:id/subject/:subjectid',
        component: SubjectDetailedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
