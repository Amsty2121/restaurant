import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/_models/Tables/Table';
import { TableStatus } from 'src/app/_models/TableStatuses/TableStatus';
import { TableService } from 'src/app/_services/table.service';
import { Order } from 'src/app/_models/Orders/Order';
import { Waiter } from 'src/app/_models/Waiters/Waiter';


@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css'],
})
export class EditTableComponent implements OnInit {
  pageTitle!: string;
  tableForm!: FormGroup;
  tableStatus!:TableStatus;
  tableStatuses!:TableStatus[];
  waiters!:Waiter[];
  waiter!:Waiter;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tableService: TableService
  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      if (objectId === 0) {
        this.pageTitle = 'Add Table:';
      } else {
        this.getTable(objectId);
        this.pageTitle = 'Edit Table:';
      }
    });

      this.tableService
      .getAllTableStatuses()
      .subscribe((tableStatuses: TableStatus[]) => {
        this.tableStatuses = tableStatuses;
      });

      this.tableService
      .getAllWaiters()
      .subscribe((waiters: Waiter[]) => {
        this.waiters= waiters;
      });

    this.tableForm = this.fb.group({
      id: [objectId],
      tableDescription: [
        '',
        [
          Validators.maxLength(500),
        ],
      ],
      tableStatusId: [
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
      
    });
  }


  get tableDescription() {
    return this.tableForm.get('tableDescription');
  }
  get tableStatusId() {
    return this.tableForm.get('tableStatusId');
  }

  get waiterId() {
    return this.tableForm.get('waiterId');
  }

  getTable(id: number): void {
    this.tableService.getTable(id).subscribe((table:Table) => {
      this.tableForm.patchValue({ ...table });
    });
  }

  saveTable(): void {
    if (this.tableForm.dirty && this.tableForm.valid) {
      const tableToSave: Table = {
        ...this.tableForm.value,
      };
      this.tableService
        .saveTable(tableToSave)
        .subscribe(() => this.onSaveComplete());
      this.tableService;
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.tableForm.reset();
    this.router.navigate(['/admin/table-list']);
  }
}
