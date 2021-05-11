import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productName: string = "";
  @Input() profile: any;
  currentUser$!: Observable<IUser>
  cartSubject$!: Observable<Cart>;
  user!: IUser;
  items!: Cart;
  list: productModel[] = [];
  filterList:productModel[] = [];

  constructor(public router: Router, 
    public service: UserService, 
    private cartService: CartService,
    private productService: ProductsService) {
    this.cartService.cartSubject$.pipe(take(1)).subscribe(
      res => {
        this.items = res;
      }
    )
    this.productService.getProduct().subscribe(
      res => {
        this.list = res;
        this.filterList = this.list;
      },
      err => {
        console.error(err);
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

  showDropDown = false;
  toggleProductDropdown()
  {
    this.showDropDown = !this.showDropDown;
  }
  setValue(name: string)
  {
    this.productName = name;
    this.showDropDown = false;
  }

  navigatePage(productName: string)
  {
    if (productName != "")
    this.router.navigateByUrl('/e-commerce/product/'+productName);
    else 
    this.router.navigateByUrl('e-commerce/home');

  }

}
//=>pass