import { productModel } from 'src/app/models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
  // images = ['../../assets/img/slider-1.jpg','../../assets/img/slider-2.jpg','../../assets/img/slider-3.jpg'];

}
