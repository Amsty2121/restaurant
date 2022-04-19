import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-kitchener',
  templateUrl: './kitchener.component.html',
  styleUrls: ['./kitchener.component.css'],
})
export class KitchenerComponent implements AfterViewInit {
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
