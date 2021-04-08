import { productModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId:number = 0;
  productData!:productModel ;

  constructor(private activateRoute:ActivatedRoute,private productService:ProductsService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(data =>
      {
        this.productId = data.id;
      }
      )
      this.productService.getProductById(this.productId).subscribe(
      
        details =>{
          this.productData = details;
         }
      )
  }
}
