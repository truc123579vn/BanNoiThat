import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:UserService,private router:Router,private toastr:ToastrService) { }

  formModel  = this.fb.group({
    UserName : ['',Validators.required],
    Password:['',Validators.required]
  });

  ngOnInit(): void {
    if(sessionStorage.getItem('token')!=null){
      this.router.navigateByUrl('/e-commerce');
    }
  }

  login(formModel:FormGroup){
    this.service.login(formModel.value).subscribe(
      (res:any)=>{
        sessionStorage.setItem('token',res.token);
        this.toastr.success('Đăng nhập thành công','Tài khoản hợp lệ');
        this.router.navigateByUrl("/e-commerce");
      },
      err => {
        if(err.status == 404){
          this.toastr.error('Tài khoản hoặc mật khẩu không đúng','Đăng nhập thất bại');
        }else{
          this.toastr.error(err,'Đăng nhập thất bại');
        }
      }
    );
  }
}
