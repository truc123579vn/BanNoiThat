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



@NgModule({
  declarations: [AdminComponent, SidebarComponent, TopbarComponent, FooterComponent, AsidebarComponent,LoginComponent, AccountComponent, OrdersComponent, StatisticsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }
