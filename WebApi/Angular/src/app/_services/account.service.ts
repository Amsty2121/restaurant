import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerToken } from '../_models/Account/BearerToken';
import { environment } from 'src/environments/environment';
import { UserForLogin } from '../_models/Account/UserForLogin';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return token ? true : false;
  }

  login(userForLoginDto: UserForLogin): Observable<BearerToken> {
    return this.http.post<BearerToken>(
      this.baseUrl + 'account/login',
      userForLoginDto
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['login']);
  }
}
