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



@NgModule({
  declarations: [AdminComponent, SidebarComponent, TopbarComponent, FooterComponent, AsidebarComponent,LoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }
