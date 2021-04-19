import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

   loadCurrentUser(){
    const token = localStorage.getItem('token');
      this.service.loadCurrentUser(token).subscribe(() => {
        console.log('Đã có user đăng nhập');
      }, error => {
        console.log(error);
      });
  }
}
 