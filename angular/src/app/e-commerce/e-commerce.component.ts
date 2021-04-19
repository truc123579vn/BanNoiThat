import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent implements OnInit {

  userDetails:any;

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {this.userDetails = res,console.log(res)},
      err => {console.log(err)}
    );
  }
}
