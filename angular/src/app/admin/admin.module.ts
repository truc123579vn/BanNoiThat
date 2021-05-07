import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule,routingAdminComponents } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { AsidebarComponent } from './asidebar/asidebar.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { Component } from '@fullcalendar/core';
import { AccountComponent } from './account/account.component';
import { OrdersComponent } from './orders/orders.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {  MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminComponent, SidebarComponent, TopbarComponent, FooterComponent, AsidebarComponent,
    LoginComponent, AccountComponent, OrdersComponent, StatisticsComponent, ProductsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    MatTabsModule,
    ReactiveFormsModule
  ],  
  providers: []
})
export class AdminModule { }
