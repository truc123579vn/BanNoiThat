// import { AbstractControl } from '@angular/forms';
// import { map, switchMap } from 'rxjs/operators';
// import { AccountService } from 'src/app/services/user.service';
// import { Observable, of, Subject, timer } from 'rxjs';


// export class ValidateEmailNotTaken {
//   constructor(private accountService: AccountService) {}

 
  
//   static createValidator(accountService: AccountService) {
//     return (control: AbstractControl) => {
//       return accountService.getAccountByUserName(control.value).pipe(map(res => {
//         return res ? null : { emailTaken: true };
//       }));
//     };
//   }
// }