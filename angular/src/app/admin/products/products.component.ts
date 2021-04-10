import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

// Perry
/* declare var $
declare var toastr;
declare var  Toast; */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // Perry
  products:productModel[] = [];
  // SelectedImage:File=null;

 
  constructor(private service:ProductsService) {}
  
  ngOnInit(): void {
    this.service.getProduct().subscribe(
      (data:productModel[]) => {
        console.log(data);
        this.products = data;
      }
    )
    
  }

  search(input: any) {
    //this.proSer.getFromDb(input);
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
