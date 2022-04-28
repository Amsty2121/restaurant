import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { UsersListComponent } from './users/user-list/user-list.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { EditDishComponent } from './dishes/edit-dish/edit-dish.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import { EditIngredientComponent } from './ingredients/edit-ingredient/edit-ingredient.component';
import { DishComponent } from './dishes/dish/dish.component';
import { TableListComponent } from './tables/table-list/table-list.component';
import { EditTableComponent } from './tables/edit-table/edit-table.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    ConfirmDialogComponent,
    UsersListComponent,
    CreateUserComponent,
    DishListComponent,
    EditDishComponent,
    OrderListComponent,
    EditOrderComponent,
    IngredientListComponent,
    EditIngredientComponent,
    DishComponent,
    TableListComponent,
    EditTableComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
  ],
})
export class AdminModule {}
