import { InsertedAdmin } from './../../../_models/Users/InsertedAdmin';
import { InsertedWaiter } from './../../../_models/Users/InsertedWaiter';
import { PasswordErrorStateMatcher } from 'src/app/_models/ErrorStateMatchers/PasswordsErrorStateMatcher';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/_models/Roles/Role';
import { UsernameAlreadyExistsValidator } from 'src/app/_models/Validators/UsernameAlreadyExists';
import { passwordsMatchValidator } from 'src/app/_models/Validators/PasswordsMatch';
import { UsernameErrorStateMatcher } from 'src/app/_models/ErrorStateMatchers/UsernameErrorStateMatcher';
import { InsertedKitchener } from 'src/app/_models/Users/InsertedKitchener';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  roles!: Role[];
  namesErrorMatcher = new UsernameErrorStateMatcher();
  passwordErrorMatcher = new PasswordErrorStateMatcher();
  selectedRole!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private usernameAlreadyExistsValidator: UsernameAlreadyExistsValidator,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });

    this.userForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
        this.usernameAlreadyExistsValidator.validate.bind(
          this.usernameAlreadyExistsValidator
        ),
      ],
      passwords: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
            ],
          ],
          repeatedPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
            ],
          ],
        },
        { validators: passwordsMatchValidator }
      ),
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern('^[a-zA-ZăîșțĂÎȘȚ]+$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern('^[a-zA-ZăîșțĂÎȘȚ]+$'),
        ],
      ],
    });
  }

  get username() {
    return this.userForm.get('username');
  }

  get passwordGroupForm() {
    return this.userForm.controls['passwords'];
  }

  get password() {
    return this.passwordGroupForm.get('password');
  }

  get repeatedPassword() {
    return this.passwordGroupForm.get('repeatedPassword');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  createUser() {``
    if (this.userForm.dirty && this.userForm.valid) {
      if (this.selectedRole == 'kitchener') {
        const kitchenerToSave: InsertedKitchener = {
          ...this.userForm.value,
        };
        kitchenerToSave.password = this.password?.value;
        this.userService
          .createNewKitchener(kitchenerToSave)
          .subscribe(() => this.onUserCreated());
      } 
      else if (this.selectedRole == 'waiter') {
        const waiterToSave: InsertedWaiter = {
          ...this.userForm.value,
        };
        waiterToSave.password = this.password?.value;
        this.userService
          .createNewWaiter(waiterToSave)
          .subscribe(() => this.onUserCreated());
      } 
      else if (this.selectedRole == 'admin') {
        const adminToSave: InsertedAdmin = {
          ...this.userForm.value,
        };
        adminToSave.password = this.password?.value;
        this.userService
          .createNewAdmin(adminToSave)
          .subscribe(() => this.onUserCreated());
      }
    }
  }

  onUserCreated() {
    this.userForm.reset();
    this.router.navigate(['/admin/users']);
  }
}
