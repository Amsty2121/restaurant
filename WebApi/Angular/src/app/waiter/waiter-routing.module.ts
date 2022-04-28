import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaiterComponent } from './waiter/waiter.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';

const routes: Routes = [
  {
    path: '',
    component: WaiterComponent,
    children: [
      {
        path: 'order-list',
        component: OrderListComponent,
        data: {
          userRole: 'waiter',
        },
      },
      {
        path: 'edit-order/:id',
        component: EditOrderComponent,
      },
      {
        path: 'dish-list',
        component: DishListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterRoutingModule {}
