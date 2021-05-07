
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { ReplaySubject, Subject } from 'rxjs'
import { productModel } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cartItem.model';
import { IUser } from '../models/user.model';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];
  cartSubject = new ReplaySubject<Cart>(1);
  cartSubject$ = this.cartSubject.asObservable();

  //================================================================//
  baseUrl = environment.urlAPI;
  public _cart!: any;
  user!: IUser;
  productList: productModel[] = [];

  constructor(
    private http: HttpClient,
    private prouductService: ProductsService,
    private toastr: ToastrService
  ) {
    this.prouductService.getProduct().subscribe((res) => {
      this.productList = res;
    });
  }

  async getCartItems() {
    return (await this.fetchCart())?.cartItems;
  }

  async addToCart(product: productModel) {
    let cart = (await this.fetchCart()) ?? this.createCart();
    var index = cart.cartItems.findIndex(
      (i: CartItem) => i.productId === product.id
    );
    if (index === -1) {
      cart.cartItems.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price,
      });
      this.toastr.success("Thêm sản phẩm vào giỏ hàng thành công", "Thêm thành công");
    } else {
      cart.cartItems[index].qty++;
      if (cart.cartItems[index].qty > product.amount) {
        cart.cartItems[index].qty--;
        this.toastr.error("Hiện tại sản phẩm này không đủ số lượng", "Thêm thất bại");
      } else {
        this.toastr.success("Thêm sản phẩm vào giỏ hàng thành công", "Thêm thành công");
      }
    }
    this.cartSubject.next(cart);
    this.updateCart(cart).subscribe(
      (cart) => { },
      (error) => console.log(error)
    );
  }

  async increaseQty(item: CartItem) {
    let cart = await this.fetchCart();
    var index = cart.cartItems.findIndex(
      (i: CartItem) => i.productId == item.productId
    );
    if (index === -1) {
    } else {
      var product = this.productList.find((pro) => pro.id === item.productId);
      if (product) {
        cart.cartItems[index].qty++;
        if (cart.cartItems[index].qty > product.amount) {
          this.toastr.error("Hiện tại sản phẩm này không đủ số lượng", "Cập nhật thất bại");
          cart.cartItems[index].qty--;

        } else {
          this.toastr.success("Cập nhật số lượng thành công", "Cập nhật thành công");
        }
      }
    }
    this.cartSubject.next(cart);
    this.updateCart(cart).subscribe(
      (cart) => { console.log(cart) },
      (error) => console.error(error)
    );
  }

  async decreaseQty(item: CartItem) {
    let cart = await this.fetchCart();
    var index = cart.cartItems.findIndex(
      (i: CartItem) => i.productId == item.productId
    );
    if (index === -1) {
    } else {
      if (cart.cartItems[index].qty >= 1) {
        cart.cartItems[index].qty--;
        this.toastr.success("Cập nhật số lượng thành công", "Cập nhật thành công");
        if (cart.cartItems[index].qty == 0) {
          cart.cartItems.splice(index, 1);
        }
        this.cartSubject.next(cart);
        this.updateCart(cart).subscribe(
          (cart) => { console.log(cart) },
          (error) => console.error(error)
        );
      }
    }
  }
  clearCart() {
    var id = localStorage.getItem("cartId");
    if(id){
      this.deleteCart(id?.toString()).subscribe(
        res =>{
          console.log("Xóa thành công");
        }
      );
      this._cart = null;
      this.cartSubject.next(null!);
    }else{
      console.log("Id null");
    }
   
  }

  private getCartByName(username: string) {
    return this.http.get<Cart>(this.baseUrl + '/carts/get' + username);
  }

  getCart(cartId: string) {
    return this.http.get<Cart>(this.baseUrl + '/carts/' + cartId);
  }

  private updateCart(cart: Cart) {
    return this.http.put<Cart>(this.baseUrl + '/carts', cart);
  }

  deleteCart(cartId: string) {
    return this.http.delete(this.baseUrl + '/carts/' + cartId);
  }

  private async fetchCart() {
    if (!this._cart) {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        this._cart = await this.getCart(cartId).toPromise();
      }
    }
    return this._cart;
  }

  private createCart() {
    const cart = { id: 'cart_id', cartItems: [] };
    localStorage.setItem('cartId', cart.id);
    return cart;
  }

  async deleteCartItem(item: CartItem) {
    var cart = await this.fetchCart();
   
    var index = cart.cartItems.findIndex((i: CartItem) => i.productId === item.productId);
    if (index == -1) {

    } else {
      cart.cartItems.splice(index, 1);
      this.updateCart(cart).subscribe(
        (cart) => { console.log(cart); location.reload() },
        (error) => console.log(error)
      );
      console.log(cart.cartItems);
    }

  }

  async createCartAfterLogin(userId: number) {
    var items: CartItem[];
    var CartId = userId.toString();
    var itemsInTempCart = await this.getCartItems();
    this.deleteCart("cart_id").subscribe(
      res => {
        console.log("Xóa cart temp thành công");
      }
    );
    this.clearCart();
    localStorage.setItem('cartId', userId.toString());
    var itemsInUserCart = await this.getCartItems();
    if (itemsInTempCart && itemsInUserCart) {
      //pass nha :<
      for (let item of itemsInTempCart) {
        var index = itemsInUserCart.findIndex(
          (i: CartItem) => i.productId == item.productId
        );
        if (index == -1) {
          itemsInUserCart.push({
            productId: item.productId,
            productName: item.productName,
            qty: item.qty,
            price: item.price,
          });
        } else {
          var product = this.productList.find(p => p.id === item.productId);
          itemsInUserCart[index].qty += item.qty;
          if (product) {
            if (itemsInUserCart[index].qty > product.amount) {
              itemsInUserCart[index].qty = product.amount;
            }
          }
        }
      }
      items = itemsInUserCart;
    } else if (!itemsInTempCart && itemsInUserCart) {
      //pass
      items = itemsInUserCart;
    } else if (itemsInTempCart && !itemsInUserCart) {
      //pass
      items = itemsInTempCart;
    } else {
      //pass
      items = [];
    }
    const cart = { id: CartId, cartItems: items };
    this.cartSubject.next(cart);
    this.updateCart(cart).subscribe(
      () => { },
      (error) => console.log(error)
    );
    return cart;
  }
}
