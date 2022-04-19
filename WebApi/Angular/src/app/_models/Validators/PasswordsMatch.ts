import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const repeatedPassword = control.get('repeatedPassword');

  return password?.value == repeatedPassword?.value ? null : { areSame: false };
};
