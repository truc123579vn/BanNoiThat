
import { CategoryService } from './../services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ECommerceRoutingModule,routingECommerceComponents } from './e-commerce-routing.module';
import { ECommerceComponent } from './e-commerce.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { UserService } from '../shared/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../services/cart.service';
import { AuthInterceptor } from './auth/auth.interceptor';


@NgModule({
  declarations: [ECommerceComponent, ProductsComponent, HeaderComponent, FooterComponent, CartComponent, ProductListComponent, ProductDetailComponent, RegisterComponent, LoginComponent, AccountComponent],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,

  ],

  providers: [UserService,ProductsService,CategoryService,CartService ,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],

})
export class ECommerceModule { }
