import { AbstractControl, ValidatorFn } from '@angular/forms';

export class UrlValidators{

    static urlValidator(control: AbstractControl): {[key: string]: boolean} | null {
        const urlRegExp = /^(http|https):\/\/([\w]+\.)+[\w]{2,63}[\/\w.-]*$/;
        const valid = urlRegExp.test(control.value);
        return valid ? null : { invalidUrl: true };
      }

}