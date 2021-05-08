import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service:UserService) { }

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
            localStorage.removeItem("token");
            this.service.setNullCurrentUser();
            location.reload();
          } else {
           
          }
        }
      )
    }
  }

}
