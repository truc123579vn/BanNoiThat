import { productModel } from 'src/app/models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProduct!:productModel[]; 
  featureProduct!:productModel[];

  constructor(private service:ProductsService) {
    this.service.getProduct().subscribe(
      data =>{
        this.listProduct = data;
      }
    )
  
   }

  ngOnInit(): void {

  }

}
