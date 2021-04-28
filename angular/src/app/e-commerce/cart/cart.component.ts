import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import * as $ from "jquery";
import * as b from 'bootstrap';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any = [];
  cartTotal = 0;
  currentUser$!: Observable<IUser>;
  user!: IUser;
  formModel!: FormGroup;
  @ViewChild('#modelId') completeModal!: ElementRef;


  constructor(private router: Router, private userService: UserService, private toastr: ToastrService, private fb: FormBuilder, private order: OrderService) {
    this.cartDetail();
    this.currentUser$ = this.userService.currentUser$;

    this.userService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.createForm(user);
      this.addOrderDetail();
    });
  }

  ngOnInit(): void {
  
  }
  cartDetail() {
    if (localStorage.getItem('cart')) {
      this.items = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log(this.items);

      this.cartTotal = 0;
      this.items.forEach((item: any) => {
        this.cartTotal += item.qty * item.price;
      });
    }
  }
  increaseQty(product: productModel) {
    
    this.items = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let i = 0; i < this.items.length; i++) {
      if (
        product.productId === parseInt(this.items[i].productId) &&
        this.items[i].qty < this.items[i].amount
      ) {
        this.items[i].qty = product.qty + 1;
        break;
      }
    }
    this.cartTotal = 0;
    this.items.forEach((item: any) => {
      this.cartTotal += item.qty * item.price;
    });
    localStorage.setItem('cart', JSON.stringify(this.items));
    location.reload();
  }

  decreaseQty(product: any) {
    this.items = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let i = 0; i < this.items.length; i++) {
      if (
        product.productId === parseInt(this.items[i].productId) &&
        this.items[i].qty > 1
      ) {
        this.items[i].qty = product.qty - 1;
        break;
      }
      if (
        product.productId === parseInt(this.items[i].productId) &&
        this.items[i].qty == 1
      ) {
        this.deleteItem(this.items[i]);
      }
    }

    this.cartTotal = 0;
    this.items.forEach((item: any) => {
      this.cartTotal += item.qty * item.price;
    });
    localStorage.setItem('cart', JSON.stringify(this.items));
    location.reload(); //reload page to update cart total's quality on header
  }
  deleteItem(product: any) {
    console.log(product);
    if (localStorage.getItem('cart')) {
      this.items = JSON.parse(localStorage.getItem('cart') || '{}');
      for (let i = 0; i < this.items.length; i++) {
        if (product.productId === parseInt(this.items[i].productId)) {
          this.items.splice(i, 1);
          localStorage.setItem('cart', JSON.stringify(this.items));
          this.cartDetail();
          location.reload();
        }
      }
    }
  }

  removeallCart() {
    localStorage.removeItem('cart');
    this.items = [];
    location.reload();
  }

  checkLogin() {
    if (localStorage.getItem('token') === null) {
      this.toastr.error("Hãy đăng nhập", "Thực hiện đăng nhập để mua hàng");
    }
  }

  createForm(user: IUser) {
    if(user==null){
      this.formModel === null;
    }else{
      this.formModel = this.fb.group({
        user_id: user.id,
        address: ["", Validators.required],
        OrderDetails: this.fb.array([

        ])
      })
    }
  
  }

  consoleData(formGroup: FormGroup) {
    this.order.createOrder(formGroup.value).subscribe(
      res => {
        this.toastr.success("Đặt hàng thành công");
        localStorage.removeItem('cart');
        $("#modelId").hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        this.router.navigateByUrl("/e-commerce/home");
      },
      err => {
        this.toastr.success("Đặt hàng không thành công");
      }
    );
  }

  orderDetails(): FormArray {
    return this.formModel.get('OrderDetails') as FormArray;
  }

  newOrderDetail(item: any) {
    return this.fb.group({
      ProductId: item.productId,
      Qty: item.qty,
      Price: item.price
    })
  }

  addOrderDetail() {

    for (let item of this.items) {
      this.orderDetails().push(this.newOrderDetail(item));
    }
  }
}



