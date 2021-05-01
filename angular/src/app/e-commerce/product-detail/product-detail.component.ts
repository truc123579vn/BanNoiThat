import { CartItem } from './../../models/cartItem.model';
import { IUser } from './../../models/user.model';
import { productModel } from './../../models/product.model';
import { ICategory } from './../../models/category.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/shared/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId:number = 0;
  productData!:productModel ;
  listCategory:ICategory[]=[];
  listProduct:productModel[]=[];
  user!:IUser;
  items!:CartItem[];
  item!:CartItem;
  count = 1;

  constructor(private categoryService:CategoryService,private activateRoute:ActivatedRoute,private productService:ProductsService,private cartService:CartService) { 
    this.categoryService.getCategoryList().subscribe(
      (res:ICategory[]) => {
          this.listCategory = res;
      }
    )

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(data =>
      {
        this.productId = data.id;
      }
      )
      this.productService.getProductById(this.productId).subscribe(
      
        details =>{
          this.productData = details;
         }
      )
  }
  addToCart(product: productModel) {
    for(var i = 0;i<this.count;i++){
      this.cartService.addToCart(product);
    }
 
    
  }

  decrease() {
    if(this.count>=2){
      this.count--;
    }
  }

  increase() {
    this.count++;
  }
   
}
