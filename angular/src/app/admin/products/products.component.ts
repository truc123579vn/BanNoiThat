import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category.model';
import { productModel } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
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
  // category: ICategory;
  
  constructor(private proSer: ProductsService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    
  }

  // getList () {
  //   this.categoryService.getCategory(this.category.id).subscribe(result =>{
  //     this.category = result;
  //   })
  // }

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
