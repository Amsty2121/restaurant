import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { EditDishComponent } from './dishes/edit-dish/edit-dish.component';
import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import { KitchenerComponent } from './kitchener/kitchener.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { OrderListComponent } from './orders/order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: KitchenerComponent,
    children: [
      {
        path: 'dish-list',
        component: DishListComponent,
      },
      {
        path: 'edit-dish/:id',
        component: EditDishComponent,
      },
      {
        path: 'order-list',
        component: OrderListComponent,
      },
      {
        path: 'edit-order/:id',
        component: EditOrderComponent,
      },
      {
        path: 'ingredient-list',
        component: IngredientListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KitchenerRoutingModule {}
