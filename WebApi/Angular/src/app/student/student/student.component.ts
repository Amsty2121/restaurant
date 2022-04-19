import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements AfterViewInit {
  username!: string | null;

  constructor(
    private accountService: AccountService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.username = localStorage.getItem('userName');
    this.changeDetectorRef.detectChanges();
  }

  logout() {
    this.accountService.logout();
  }
}
