import { UserService } from './../../_services/user.service';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AsyncValidator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsernameAlreadyExistsValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let userdata = { username: ctrl.value };
    return this.userService
      .usernameAlreadyExists(userdata)
      .pipe(map((isTaken) => (isTaken ? { uniqueUsername: true } : null)));
  }
}
