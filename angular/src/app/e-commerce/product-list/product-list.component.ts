import { CategoryService } from './../../services/category.service';
import { ICategory } from './../../models/category.model';


import { productModel } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  list:productModel[] = [];
  listCategory:ICategory[] = [];
  page:number = 1;
  productName:string ="";
  clickAllProduct:boolean = false;


  constructor(private productService:ProductsService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(
      (data:productModel[] )=>{
        this.list = data;
    
      }
    );
    this.categoryService.getCategoryList().subscribe(
      ((data:ICategory[])=>{
        this.listCategory = data;
      })
    );
  }

 

  Search(){
    if(this.productName==""){
      this.ngOnInit();
    }else{
      this.list = this.list.filter(res =>
        {
          return res.name.toLowerCase().match(this.productName.toLowerCase());
        });
    }
  }
}
