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
  }

  // hàm này là lấy thông tin currentUser
  getUserProfile() {
    this.currentUser$.pipe(take(1)).subscribe(
      user => {
        if (user) {
          this.user = user;
        }
      }
    )
  }

  // hàm này là tính số lượng sản phẩm có trong cart của khách hàng và đưa lên header
  countItemInCart() {
    var count = 0;
    if (this.items) {
      for (var item of this.items.cartItems) {
        count = item.qty + count;
      }
    }
    return count;
  }
}
//=>pass