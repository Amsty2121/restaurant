import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/_models/Ingredients/Ingredient';
import { DishCategory } from 'src/app/_models/DishCategories/DishCategory';
import { DishStatus } from 'src/app/_models/DishStatuses/DishStatus';
import { DishService } from 'src/app/_services/dish.service';
import { Dish } from 'src/app/_models/Dishes/Dish';
import { OrderStatus } from 'src/app/_models/OrderStatuses/OrderStatus';
import { OrderService } from 'src/app/_services/order.service';
import { Kitchener } from 'src/app/_models/Kitcheners/Kitchener';
import { Order } from 'src/app/_models/Orders/Order';
import { Waiter } from 'src/app/_models/Waiters/Waiter';
import { Table } from 'src/app/_models/Tables/Table';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  pageTitle!: string;
  orderForm!: FormGroup;
  dishes!:Dish[];
  dish!:Dish;
  kitchener!:Kitchener;
  kitcheners!:Kitchener[];
  waiter!:Waiter;
  waiters!:Waiter[];
  orderStatus!:OrderStatus;
  orderStatuses!:OrderStatus[];
  table!:Table;
  tables!:Table[];
  currentOrder!:Order;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      if (objectId === 0) {
        this.pageTitle = 'Add Order:';
      } else {
        this.getOrder(objectId);
        this.pageTitle = 'Edit Order:';
      }
    });

    this.orderService
      .getAllDishes()
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
      });

      this.orderService
      .getOrder(objectId)
      .subscribe((order: Order)=>{
        this.currentOrder = order;
      })





      this.orderService
      .getAllStatuses()
      .subscribe((orderStatuses: OrderStatus[]) => {
        this.orderStatuses = orderStatuses;
      });

      this.orderService
      .getAllKitcheners()
      .subscribe((kitcheners: Kitchener[]) => {
        this.kitcheners = kitcheners;
      });

      this.orderService
      .getAllWaiters()
      .subscribe((waiters: Waiter[]) => {
        this.waiters = waiters;
      });

      this.orderService
      .getAllTables()
      .subscribe((tables: Table[]) => {
        this.tables = tables;
      });

    this.orderForm = this.fb.group({
      id: [objectId],
      orderNrPortions: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10)
        ],
      ],
      orderDescription: [
        '',
        [
          Validators.maxLength(500),
        ],
      ],
      dishId: [
        '',
        [
          Validators.required,
        ],
      ],
      orderStatusId: [
        '',
        [
          Validators.required,
        ],
      ],
      tableId: [
        '',
        [
          Validators.required,
        ],
      ],
      waiterId: [
        '',
        [
          Validators.required,
        ],
      ],
      kitchenerId: [
        '',
        [
          Validators.required,
        ],
      ],
      
    });
  }

  get orderDescription() {
    return this.orderForm.get('orderDescription');
  }

  get orderNrPortions() {
    return this.orderForm.get('orderNrPortions');
  }

  get orderStatusId() {
    return this.orderForm.get('orderStatusId');
  }

  get dishId() {
    return this.orderForm.get('dishId');
  }

  get tableId() {
    return this.orderForm.get('tableId');
  }
  get waiterId() {
    return this.orderForm.get('waiterId');
  }
  get kitchenerId() {
    return this.orderForm.get('kitchenerId');
  }

  getOrder(id: number): void {
    this.orderService.getOrder(id).subscribe((order: Order) => {
      this.orderForm.patchValue({ ...order });
    });
  }

  saveOrder(): void {
    if (this.orderForm.dirty && this.orderForm.valid) {
      const orderToSave: Order = {
        ...this.orderForm.value,
      };
      this.orderService
        .saveOrder(orderToSave)
        .subscribe(() => this.onSaveComplete());
      this.orderService;
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.orderForm.reset();
    this.router.navigate(['/kitchener/order-list']);
  }
}