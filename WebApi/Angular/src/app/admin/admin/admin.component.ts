import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  username!: string | null;
  constructor(
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
  }

  logout() {
    this.accountService.logout();
  }
}
