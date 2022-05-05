import { OrdersService } from './../../../_services/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/Orders/Order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  pageTitle!: string;
  orderForm!: FormGroup;
  currentOrder!: Order;
  currentOrderId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private router: Router
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

    /*this.coursesService.getAllCourses().subscribe((courses: Course[]) => {
      this.courses = courses;
    });*/

    this.orderForm = this.fb.group({
      id: [objectId],
      orderId: [''],
      orderDescription: [
        '',
        [Validators.minLength(0), Validators.maxLength(500)],
      ],
      orderNrPortions: ['', [Validators.pattern('^[0-9]*$')]],
      orderStatusId: [''],
      tableId: [''],
      dishId: [''],
    });
  }

  getOrder(id: number): void {
    this.ordersService.getOrder(id).subscribe((order: Order) => {
      this.orderForm.patchValue({ ...order });
    });
  }

  saveOrder(): void {
    if (this.orderForm.dirty && this.orderForm.valid) {
      const orderToSave: Order = {
        ...this.orderForm.value,
      };
      this.ordersService
        .saveOrder(orderToSave)
        .subscribe(() => this.onSaveComplete());
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.orderForm.reset();
    this.router.navigate(['/admin/ordersList/orders/', this.currentOrderId]);
  }

  get orderIdControl() {
    return this.orderForm.get('orderId');
  }
  get orderNrPortions() {
    return this.orderForm.get('orderNrPortions');
  }
  get orderDescription() {
    return this.orderForm.get('orderDescription');
  }
  get orderStatusId() {
    return this.orderForm.get('orderStatusId');
  }
  get tableId() {
    return this.orderForm.get('tableId');
  }
  get dishId() {
    return this.orderForm.get('dishId');
  }
  get kitchenerId() {
    return this.orderForm.get('kitchenerId');
  }
  get waiterId() {
    return this.orderForm.get('waiterId');
  }
}
