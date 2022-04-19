import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";

export function ingredientsSelected(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value.length>0) {
            return control.value;
        }
        return null;
    };
  }