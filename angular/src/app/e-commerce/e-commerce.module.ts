import { AuthGuard } from './auth/auth.guard';
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
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { UserService } from '../shared/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../services/cart.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentComponent } from './payment/payment.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
// import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [ECommerceComponent, ProductsComponent, HeaderComponent, FooterComponent, CartComponent, ProductListComponent, ProductDetailComponent, RegisterComponent, LoginComponent, AccountComponent, PaymentComponent],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,  
    NgbModule,
    IvyCarouselModule,
    // CarouselModule 
  ],

  providers: [UserService, ProductsService, CategoryService, CartService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  } ],


})
export class ECommerceModule { }
