import { productModel } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { orderModel } from './../../models/order.model';
import { orderDetailsModel } from './../../models/orderDetails.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user!: IUser;
  list: orderModel[]=[];
  listProduct:productModel[]=[];
  page: number = 1;

  constructor(private router: Router, private service: UserService, private order: OrderService,private product:ProductsService) { }

  ngOnInit(): void {
    this.product.getProduct().subscribe(
      res =>{
        this.listProduct = res;
      }
    )
    this.service.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.user = user;
        this.order.getOrders().subscribe(
          res =>{
            res = res.filter(item => item.user_Id.toString()=== user.id.toString())
            console.log(res);
            this.list = res;
       
          }
        )
      }
    )

  }

  logOut() {
    this.service.logout();
    this.router.navigateByUrl("/e-commerce/home");
  }


  getColor(status:any) { 
    switch (status) {
      case 'Chưa Duyệt':
        return 'red';
      case 'Đã Duyệt':
        return 'green';
    }
    return null;
  }

 getProductImage(id:any){
  console.log(this.listProduct.find(item => item.id == id)?.image.toString());
 }
}
