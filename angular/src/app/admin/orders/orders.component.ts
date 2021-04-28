import { ProductsService } from './../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { orderModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Observable<orderModel[]> = this.orderService.getOrders();
  orderStatus1: orderModel[] = [];
  orderStatus2: orderModel[] = [];
  page: number = 1;
  page1: number = 1;
  listProduct: productModel[] = [];
  constructor(private productService: ProductsService, private orderService: OrderService, private http: HttpClient, private toastr: ToastrService) {
    this.productService.getProduct().subscribe(
      res => {
        this.listProduct = res;
        console.log(res);
        console.log(this.listProduct);
      }
    )
    this.orderService.getOrders().subscribe(
      res => {
        this.orderStatus1 = res.filter(item => item.status === "Chưa Duyệt")
        this.orderStatus2 = res.filter(item => item.status === "Đã Duyệt")
      }
    )
  }

  ngOnInit(): void { }

  updateStatus(id: number) {
    console.log(id);
    this.orderStatus1 = this.orderStatus1.filter(item => item.id != id);
    this.orderService.updateOrderStatus(id).subscribe(
      res => {
        this.orderStatus2.push(res);
        this.toastr.success("Đã duyệt đơn hàng thành công");
      },
      err => {
        console.log(err);
      }
    )
  }

  getImageProduct(id: number) {

    return this.listProduct.find(item => item.id === id)?.image

  }
}
