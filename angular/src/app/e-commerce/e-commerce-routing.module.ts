import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ECommerceComponent } from './e-commerce.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'',component:ECommerceComponent,
  children: [
    {path:'products',component:ProductsComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
export const routingECommerceComponents=[ProductsComponent]
