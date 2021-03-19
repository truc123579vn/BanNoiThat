import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';


const routes: Routes = [
  {path:'',loadChildren:()=> import ('./e-commerce/e-commerce.module').then(m=>m.ECommerceModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m =>m.AdminModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[AdminComponent,ECommerceComponent]