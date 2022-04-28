import { EditOrderComponent } from './../waiter/orders/edit-order/edit-order.component';
import { OrderListComponent } from './../waiter/orders/order-list/order-list.component';
import { EditTableComponent } from './tables/edit-table/edit-table.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UsersListComponent } from './users/user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import { EditIngredientComponent } from './ingredients/edit-ingredient/edit-ingredient.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { EditDishComponent } from './dishes/edit-dish/edit-dish.component';

import { DishComponent } from './dishes/dish/dish.component';
import { TableListComponent } from './tables/table-list/table-list.component';

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
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/add',
        component: CreateUserComponent,
      },
      {
        path: 'tables-list',
        component: TableListComponent,
      },
      {
        path: 'edit-tables/:id',
        component: EditTableComponent,
      },
      {
        path: 'order-list',
        component: OrderListComponent,
        data: {
          userRole: 'admin',
        },
      },
      {
        path: 'edit-order/:id',
        component: EditOrderComponent,
        data: {
          userRole: 'admin',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
