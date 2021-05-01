import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() profile: any;
  currentUser$!: Observable<IUser>
  cartSubject$!: Observable<Cart>;
  user!: IUser;
  items!: Cart;
  constructor(public router: Router, public service: UserService, private cartService: CartService) {
    this.cartService.cartSubject$.pipe(take(1)).subscribe(
      res => {
        this.items = res;



      }
    )
  }

  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;
    this.countItemInCart();
    // this.cartItemFunc();
  }

  getUserProfile() {
    this.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  countItemInCart() {
    var count = 0;
    for (var item of this.items.cartItems) {
      count = item.qty + count;
    }
    return count;
  }
  cartItem: number = 0
  // cartItemFunc(){

  //   this.items= JSON.parse(localStorage.getItem('cart') || '{}')
  //     for(let i=0; i<this.items.length;i++)
  //     {     
  //       this.cartItem=this.cartItem + this.items[i].qty;

  //     }

  // }
}