import { AbstractControl, ValidatorFn } from '@angular/forms';

export class Validation {
  static match(password: string, confirmPassword: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(password);
      const checkControl = controls.get(confirmPassword);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(confirmPassword)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static timeslot(startTimeslot: string, endTimeslot: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const start = controls.get(startTimeslot);
      const end = controls.get(endTimeslot);
      if (end?.errors && !end.errors['timeslot']) {
        return null;
      }

      if (new Date(start?.value).getTime() >= new Date(end?.value).getTime()) {
        controls.get(endTimeslot)?.setErrors({ timeslot: true });
        return { timeslot: true };
      } else {
        return null;
      }
    };
  }
}
