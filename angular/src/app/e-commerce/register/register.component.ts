
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import {ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/user.service';
import { registerModel } from 'src/app/models/register.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';

// import { ValidateEmailNotTaken } from './asyn-UserName.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm! : FormGroup  ;
  list_userCustomer : IUser [] = [];
  check : boolean | undefined;
  constructor(private fb: FormBuilder,
     private toastr: ToastrService,
     private userService: UserService,
     private accountService: AccountService,
     private router: Router,) 
     {  
       this.accountService.getAccountsCustomer().subscribe(
      res => {
        this.list_userCustomer = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        firstName: ['', [
          Validators.pattern('[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ \D]+'),
          Validators.required,
          Validators.maxLength(20)
        ]],
        lastName: ['', [
          Validators.pattern('[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ \D]+'),
          Validators.required,
          Validators.maxLength(20)

        ]],
        UserName: ['', [
          Validators.required,

        ]],
        mobileNo:['', [
          Validators.required,
          Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'),
        ]],
        password:['', [
          Validators.required,        
          Validators.minLength(4)

        ]],
        retypePassword:['', [
          Validators.required
        ]],
  
      }, {
      validator: ConfirmedValidator('password', 'retypePassword')

      })
  }
  onSubmit():void{
    let customer= new registerModel(
      this.UserName?.value,
      this.firstName?.value,
      this.lastName?.value,
      this.password?.value
    );
    
    if (this.profileForm.valid)
      { this.successmsg();
        console.warn(this.profileForm.value);
        this.accountService.createAccountUser(customer).subscribe();
        this.profileForm.reset();
      } 

          
  }


  // customValidator() : ValidatorFn 
  // {
  //   return (control : AbstractControl) : ValidationErrors | null =>
  //   {
  //       let isvalid= control.value.toString.endsWith('truc123')
  //       return isvalid ? {'customValidator' : 'check failed'} : null;
  //   }
  // }

  // validateEmailNotTaken(control: AbstractControl) {
  //   return this.accountService.getAccountByUserName(control.value).pipe(map((res: any) => {
  //     return res ? null : { emailTaken: true };
  //   }));
  // }

  
  // checkIfUsernameExists(UserName: string): Observable<boolean> {
  //   return of(this.list_userCustomer.includes(UserName)).pipe(delay(1000));
  // }

  // checkUserNameNotTaken(UserName: string)
  // {
  //   let data=this.accountService.getAccountByUserName(UserName).subscribe;
  // }
  successmsg(){  
    this.toastr.success("Đăng kí thành công",' Success')  }

  //Khong co dong nay thi ben HTML se khong thay duoc FormControl 'firstName'
  get firstName()
  {
    return this.profileForm.get('firstName')
  }

  get lastName()
  {
    return this.profileForm.get('lastName')
  }

  get UserName()
  {
    return this.profileForm.get('UserName')
  }

  get mobileNo()
  {
    return this.profileForm.get('mobileNo')
  }

  get password()
  {
    return this.profileForm.get('password')
  }

  get retypePassword()
  {
    return this.profileForm.get('retypePassword')
  }


}
