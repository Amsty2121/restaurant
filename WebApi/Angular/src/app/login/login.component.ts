import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserForLogin } from '../_models/Account/UserForLogin';
import { BearerToken } from '../_models/Account/BearerToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  userLoginForm!: FormGroup;
  errorMsg!: string;

  constructor(
    // private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  get username() {
    return this.userLoginForm.get('username');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  login() {
    const userLogin: UserForLogin = {
      ...this.userLoginForm.value,
    };
    this.accountService.login(userLogin).subscribe(
      (bearerToken: BearerToken) => {
        localStorage.setItem('accessToken', bearerToken.accessToken);
        let decodedToken = atob(bearerToken.accessToken.split('.')[1]);
        let deserializedToken = JSON.parse(decodedToken);

        let userRole =
          deserializedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

        localStorage.setItem(
          'userName',
          deserializedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ]
        );
        localStorage.setItem('userRole', userRole);

        if (userRole === 'kitchener') {
          this.returnUrl = '/kitchener';
        } else if (userRole === 'waiter') {
          this.returnUrl = '/waiter';
        } else {
          this.returnUrl = '/admin';
        }
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.errorMsg = 'Username or password is invalid';
      }
    );
  }
}
