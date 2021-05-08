import { AuthGuard } from './auth/auth.guard';



import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';

// khai bao class de dan link "vinh"
import { ProductsComponent } from '../admin/products/products.component';
import { AccountComponent } from '../admin/account/account.component';
import { OrdersComponent } from '../admin/orders/orders.component';
import { StatisticsComponent } from '../admin/statistics/statistics.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'index',
    component: AdminComponent,
    canActivateChild:[AuthGuard],
    children: [
      { path: 'products', component: ProductsComponent},
      { path: 'accounts', component: AccountComponent }, // khai baso path"vinh"
      { path: 'orders', component: OrdersComponent},
      { path: 'statistics', component: StatisticsComponent},
    ],
   
 },
  { path: '', redirectTo: '/admin', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
export const routingAdminComponents = [ProductsComponent];
