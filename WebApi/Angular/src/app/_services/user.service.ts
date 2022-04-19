import { InsertedWaiter } from './../_models/Users/InsertedWaiter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/Roles/Role';
import { UserData } from '../_models/Users/UserData';
import { InsertedKitchener} from '../_models/Users/InsertedKitchener';
import { InsertedAdmin } from '../_models/Users/InsertedAdmin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + 'role');
  }

  usernameAlreadyExists(username: UserData): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'user', username);
  }

  createNewWaiter(waiter: InsertedWaiter): Observable<InsertedWaiter> {
    return this.http.post<InsertedWaiter>(this.baseUrl + 'waiter', 
    waiter);
  }

  createNewKitchener(
    kitchener: InsertedKitchener
  ): Observable<InsertedKitchener> {
    return this.http.post<InsertedKitchener>(
      this.baseUrl + 'kitchener',
      kitchener
    );
  }

  createNewAdmin(admin: InsertedAdmin): Observable<InsertedAdmin> {
    return this.http.post<InsertedAdmin>(this.baseUrl + 'admin', admin);
  }
}
