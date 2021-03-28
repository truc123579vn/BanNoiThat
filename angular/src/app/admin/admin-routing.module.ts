import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'',component:LoginComponent ,
    children: [
      {path: 'products',component:ProductsComponent},
     
    ]
  },
  {path:"index", component:AdminComponent},
 //{path:'', redirectTo: '/admin', pathMatch:'prefix'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
export const routingAdminComponents=[ProductsComponent]