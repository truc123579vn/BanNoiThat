import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products.service';
import { UserService } from '../shared/user.service';





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [UserService, ProductsService, CategoryService]
})
export class AppRoutingModule { }
