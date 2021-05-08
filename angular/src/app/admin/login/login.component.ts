import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private currentUser$!: Observable<IUser>;
  private user!: IUser;
  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService) { }
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
  });

  ngOnInit(): void {

    this.service.currentUser$.pipe(take(1)).subscribe(
      res => {
        if (res) {
          this.user = res;
          console.log("Hello")
        } else {
          console.log(res);
        }

      }
    )
  }

  login(formModel: FormGroup) {
    this.service.login(formModel.value).subscribe(
      (res: any) => {
        this.service.currentUser$.pipe(take(1)).subscribe((user) => {
          this.user = user;
          if (this.user.role === 'Admin') {
            this.toastr.success('Tài khoản hợp lệ', 'Đăng nhập thành công');
            this.router.navigateByUrl('/admin/index');
          } else {
            this.toastr.error('Tài khoản chưa tồn tại', 'Đăng nhập thất bại');
            localStorage.removeItem('token');
          }
        });
      },
      (err) => {

      }
    );
  }

}
