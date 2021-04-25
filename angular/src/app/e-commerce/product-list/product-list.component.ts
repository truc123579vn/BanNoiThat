import { CategoryService } from './../../services/category.service';
import { ICategory } from './../../models/category.model';

import { productModel } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

import { CartService } from './../../services/cart.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  list: productModel[] = [];
  listCategory: ICategory[] = [];
  page: number = 1;
  productName: string = '';
  clickAllProduct: boolean = false;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {
    this.productService.getProduct().subscribe((data: productModel[]) => {
      this.list = data;
    });
    this.categoryService.getCategoryList().subscribe((data: ICategory[]) => {
      this.listCategory = data;
    });
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: productModel[]) => {
      this.list = data;
    });
    this.categoryService.getCategoryList().subscribe((data: ICategory[]) => {
      this.listCategory = data;
    });
  }

  Search() {
    if (this.productName == '') {
      this.ngOnInit();
    } else {
      this.list = this.list.filter((res) => {
        return res.name.toLowerCase().match(this.productName.toLowerCase());
      });
    }
  }

  itemsCart: any = [];
  addToCart(category: productModel) {
    let productExists = 1;
    window.alert('Product has been added to the cart');

    let cartDataNull = localStorage.getItem('cart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push({
        productId: category.id,
        productName: category.name,
        qty: 1,
        price: category.price,
        image: category.image,
        amount: category.amount,
      });
      localStorage.setItem('cart', JSON.stringify(storeDataGet));
    } else {
      var id = category.id;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('cart') || '{}');
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (id === parseInt(this.itemsCart[i].id)) {
          this.itemsCart[i].qty = category.qty + 1;
          index = i;
          break;
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.itemsCart));
      if (index == -1) {
        for (let i in this.itemsCart) {
          if (this.itemsCart[i].productId === category.id) {
            this.itemsCart[i].qty++;
            productExists = 0;
            break;
          }
        }

        if (productExists === 1) {
          this.itemsCart.push({
            productId: category.id,
            productName: category.name,
            qty: 1,
            price: category.price,
            image: category.image,
            amount: category.amount,
          });
        }
        localStorage.setItem('cart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
  }
}
