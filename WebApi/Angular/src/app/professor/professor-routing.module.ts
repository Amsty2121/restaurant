import { SubjectsComponent } from './subjects/subjects.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ProfessorComponent } from './professor/professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSubjectComponent } from '../admin/subjects/edit-subject/edit-subject.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessorComponent,
    children: [
      {
        path: 'coursesList',
        component: CoursesListComponent,
      },
      {
        path: 'course/:id',
        component: SubjectsComponent,
      },
      {
        path: 'editSubject/:id',
        component: EditSubjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorRoutingModule {}
