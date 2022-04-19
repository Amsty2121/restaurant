import { EditSubjectComponent } from './subjects/edit-subject/edit-subject.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UsersListComponent } from './users/user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsListComponent } from './subjects/subjects-list/subjects-list.component';
import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import {EditIngredientComponent} from './ingredients/edit-ingredient/edit-ingredient.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import {EditDishComponent} from './dishes/edit-dish/edit-dish.component';

import { CourseListComponent } from './courses/course-list/course-list/course-list.component';
import { DishComponent } from './dishes/dish/dish.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'ingredient-list',
        component: IngredientListComponent,
      },
      {
        path: 'edit-ingredient/:id',
        component: EditIngredientComponent,
      },
      {
        path: 'dish-list',
        component: DishListComponent,
      },
      {
        path: 'edit-dish/:id',
        component: EditDishComponent,
      },
      {
        path: 'dish-list/dish/:id',
        component: DishComponent,
      },
      {
        path: 'editCourse/:id',
        component: EditCourseComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/add',
        component: CreateUserComponent,
      },
      {
        path: 'coursesList/subjects/:id',
        component: SubjectsListComponent,
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
export class AdminRoutingModule {}
