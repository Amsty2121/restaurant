import { AccountService } from './../../_services/account.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements AfterViewInit {
  username!: string | null;
  constructor(
    private accountService: AccountService,
    private cdref: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.username = localStorage.getItem('userName');
    this.cdref.detectChanges();
  }

  logout() {
    this.accountService.logout();
  }
}
