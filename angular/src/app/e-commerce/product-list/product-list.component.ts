import { productModel } from 'src/app/models/product.model';
import { CategoryService } from './../../services/category.service';
import { ICategory } from './../../models/category.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

import { CartService } from './../../services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { UserService } from 'src/app/shared/user.service';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cartItem.model';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  list: productModel[] = [];
  listCategory: ICategory[] = [];
  page: number = 1;
  productName: string = "";
  clickAllProduct: boolean = false;
  filterList:productModel[] = [];


  //====================================================//
  _cart!: Promise<CartItem[]>;
  user!: IUser;

  constructor(private categoryService:CategoryService,private productService: ProductsService, private userService: UserService, private cartService: CartService) {
    this.productService.getProduct().subscribe(
      res => {
        this.list = res;
        this.filterList = this.list;
      },
      err => {
        console.error(err);
      }
    )
    this.userService.currentUser$.pipe(take(1)).subscribe(
      (user: IUser) => {
        this.user = user;
      }
    )
    this.categoryService.getCategoryList().subscribe(
      res =>{
        this.listCategory = res;
      }
    )
  }

  ngOnInit(): void { }

  addToCart(product: productModel) {
    
    this.cartService.addToCart(product);

  }

  filter(string:any){
   if(string == null){
     this.filterList = this.list;
   }else{
     console.log(string);
     this.filterList = this.list.filter(item => item.id===string);
   }
  }

  
}
