import { IUser } from 'src/app/models/user.model';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css'],
})
export class ECommerceComponent implements OnInit {
  constructor(private service: UserService, private router: Router) { }
  user!: IUser;

  ngOnInit(): void {
    this.loadCurrentUser();
    this.checkUserRole();
  }

  // hàm này là sau khi load lại component e-commerce lên thì lấy cái thằng đăng nhập vừa rồi (currentUser)
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.service.loadCurrentUser(token).subscribe(
      (res) => { console.log("Load current user thành công!, User hiện tại : " + res.userName) },
      (error) => {
        console.error("Lỗi hà loadCurrentUser() : " + error);
      }
    );
  }

  // hàm này là sau khi load được thông tin lên kiểm tra coi nó là role gì
  // nếu role = customer => cho vào trang e-commerce bình thường
  // nếu role = admin || manager => không cho vào, và quay về trang home
  checkUserRole() {
    if (this.service.isLogin()) {
      this.service.isCustomer().subscribe(
        res => {
          if (res) {
          } else {
            localStorage.removeItem("token");
            this.service.setNullCurrentUser();
            location.reload();
          }
        }
      )
    }
  }
}
//=>pass