import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private currentUser$!: Observable<IUser>;
  private user!: IUser;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;
    this.service.currentUser$.pipe(take(1)).subscribe((user) => {
            this.user = user;
            console.log(this.user);
          });
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/e-commerce/home');
    } else {
      this.router.navigateByUrl('/e-commerce/login');
    }
  }



  login(formModel: FormGroup) {
    this.service.login(formModel.value).subscribe(
      (res: any) => {
        if (this.user.role === 'Customer') {
          this.toastr.success('Tài khoản hợpz lệ', 'Đăng nhập thành công');
          this.router.navigateByUrl('/e-commerce/home');
        } else {
          this.service.currentUser$.pipe(take(1)).subscribe((user) => {
            this.user = user;
          });
          this.service.currentUser$;
          this.toastr.error('Tài khoản chưa tồn tại', 'Đăng nhập thất bại');
          localStorage.removeItem('token');
        }
      },
      (err) => {
        if (err.status == 404) {
          this.toastr.error(
            'Tài khoản hoặc mật khẩu không đúng',
            'Đăng nhập thất bại'
          );
          
        } else {
          this.toastr.error(err, 'Đăng nhập thất bại');
        }
      }
    );
  }
}
