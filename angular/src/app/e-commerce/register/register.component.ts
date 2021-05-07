
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import {ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/user.service';
import { registerModel } from 'src/app/models/register.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm! : FormGroup  ;

  constructor(private fb: FormBuilder,
     private toastr: ToastrService,
     private userService: UserService,
     private accountService: AccountService,
     private router: Router,
     ) { }

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

  successmsg(){  
    this.toastr.success("You have signed up successfully",' Success')  }

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
