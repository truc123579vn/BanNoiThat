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
import { CartItem } from 'src/app/models/cartItem.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];
  listProducts: productModel[] = [];
  cartTotal = 0;
  currentUser$!: Observable<IUser>;
  user!: IUser;
  formModel!: FormGroup;
  @ViewChild('#modelId') completeModal!: ElementRef;

  constructor(private router: Router,private order:OrderService, private toastr: ToastrService, private productService: ProductsService, private fb: FormBuilder, private userService: UserService, private cartService: CartService) {
    this.currentUser$ = this.userService.currentUser$;
    this.userService.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.user = user;
        if (this.user) {
          this.cartService.getCart(this.user.id.toString()).subscribe(
            res => {
              this.items = res.cartItems;
              this.createForm(user);
              this.addOrderDetail();
            }
          )
        } else {
          this.cartService.getCart("cart_id").subscribe(
            res => {
              this.items = res.cartItems;
            }
          )
        }

      }
    )

    this.productService.getProduct().subscribe(
      res => {
        this.listProducts = res;
      }
    )

    this.productService.getProduct().subscribe(
      res => {
        this.listProducts = res;
      
      }
    )
  }

  ngOnInit() {

  }

  getImageProduct(id: number) {

    return this.listProducts.find(item => item.id === id)?.image

  }

  decrease(item: CartItem) {

    var index = this.items.findIndex(i => i.productId === item.productId);
    if (index === -1) {

    } else {
      if (this.items[index].qty >= 1) {
        this.items[index].qty--;
        if (this.items[index].qty == 0) {
          this.items.splice(index, 1);
        }
      }
    }

    this.cartService.decreaseQty(item);
  }

  increase(item: CartItem) {
    var index = this.items.findIndex(i => i.productId === item.productId);
    if (index === -1) {

    } else {
      var product = this.listProducts.find(product => product.id.toString() == item.productId.toString());
      if (product) {
        console.log(product?.amount);
        console.log(this.items[index].qty);
        if (this.items[index].qty < product?.amount) {
          this.items[index].qty++;
          this.cartService.increaseQty(item);
        }
      }

    }
  }

  deleteItem(item: CartItem) {
    console.log(item);
    var index = this.items.findIndex((i: CartItem) => i.productId == item.productId);
    console.log(index);
    if (index == -1) {

    } else {
      console.log("Click được")
      console.log(this.items[index]);
      this.items.splice(index, 1);
      this.cartService.deleteCartItem(item);
    }
  }

  sumTotal() {
    var total = 0;
    for (var item of this.items) {
      total += item.qty * item.price;
    }
    return total;
  }

  deleteCart() {

  }
  checkLogin():boolean{
    var token = localStorage.getItem("token");
    if(token){
      this.toastr.error("Phải thực hiện đăng nhập trước khi thanh toán");
      return false;
    }
    return true;
  }

  createForm(user: IUser) {
    if (user == null) {
      this.formModel === null;
    } else {
      this.formModel = this.fb.group({
        user_id: user.id,
        address: ["", Validators.required],
        OrderDetails: this.fb.array([

        ])
      })
    }

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

  consoleData(formGroup: FormGroup) {
    this.order.createOrder(formGroup.value).subscribe(
      res => {
        this.cartService.clearCart();
        this.toastr.success("Đặt hàng thành công");
        //localStorage.removeItem('cart');
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
}



