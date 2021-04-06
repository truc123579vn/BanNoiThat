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
  /* products:productModel[];
  SelectedImage:File=null; */
  constructor(private proSer: ProductsService) {}

  ngOnInit(): void {
    // Perry
    /*  this.proSer.AllProducts.subscribe(res => {
       this.products = res
      console.log(this.products);
     }); */
  }

  // Perry
  search(input: any) {
    //this.proSer.getFromDb(input);
  }
  onSelect(event: any) {
    // Perry
    /* var tmppath = URL.createObjectURL(event.target.files[0]);
    $("#AddEmpImage").fadeIn("fast").attr('src',tmppath);
    this.SelectedImage=<File>event.target.files[0]; */
  }
}
