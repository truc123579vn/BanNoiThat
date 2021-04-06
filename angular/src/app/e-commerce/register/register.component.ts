
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm! : FormGroup  ;

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group(
      {
        firstName: ['', [
          Validators.pattern('[A-Za-z]+'),
          Validators.required,
          Validators.maxLength(20)
        ]],
        lastName: ['', [
          Validators.pattern('[A-Za-z]+'),
          Validators.required,
          Validators.maxLength(20)

        ]],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        mobileNo:['', [
          Validators.required,
          Validators.pattern('(09|01[2|6|8|9])+([0-9]{8})'),
        ]],
        password:['', [
          Validators.required
        ]],
        retypePassword:['', [
          Validators.required
        ]],
  
      }, {
      validator: ConfirmedValidator('password', 'retypePassword')

      })
  }
  onSubmit():void{
    if (this.profileForm.valid)
      this.successmsg();
    console.warn(this.profileForm.value);
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

  get email()
  {
    return this.profileForm.get('email')
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
