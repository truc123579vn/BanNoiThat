import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products : productModel[] = [];
  productName : string = "";
  p : number =1;
  
  constructor(public productService: ProductsService){}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: productModel[]) => {this.products = data});
  }

  // getList () {
  //   this.categoryService.getCategory(this.category.id).subscribe(result =>{
  //     this.category = result;
  //   })
  // }

  search(input: any) {
  }

  Search(){
    if(this.productName == ""){
      this.ngOnInit();
    }
    else
    {
      this.products = this.products.filter((res) =>
        {
          return res.name.toLowerCase().match(this.productName.toLowerCase());
          
        });
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  Sort(key: string)
  {
    this.key = key;
    this.reverse = !this.reverse;
  }
  onSelect(event: any) {

  }
  add(){

  }
  selectForUpdate(){

  }
  update(){

  }
  deleteConForm(){

  }
  selectForDelete(){

  }

  
  
}
