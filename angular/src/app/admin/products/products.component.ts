import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/product.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { event } from 'jquery';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: productModel[] = [];
  categorySelected = 1;
  productName: string = '';
  p: number = 1;
  categories: ICategory[] = [];
  imageUrl : string = "../assets/boxed-bg.jpg";
  fileToUpload : File = null;
  idDelete : number = 1 ;

  addProductForm = new FormGroup({
    nameAdd: new FormControl('', [Validators.required]),
    amountAdd: new FormControl('', [Validators.required]),
    priceAdd: new FormControl('', [Validators.required]),
    detailsAdd: new FormControl('', [Validators.required]),
    imageAdd: new FormControl('', [Validators.required]),
    statusAdd: new FormControl('', [Validators.required]),
    categoryIdAdd: new FormControl(1, [Validators.required]),
  });

  updateProductForm = new FormGroup({
    idUpdate : new FormControl('',[Validators.required]),
    nameUpdate : new FormControl('',[Validators.required]),
    amountUpdate : new FormControl('',[Validators.required]),
    priceUpdate : new FormControl('',[Validators.required]),
    detailsUpdate : new FormControl('',[Validators.required]),
    imageUpdate : new FormControl('',[Validators.required]),
    statusUpdate : new FormControl('',[Validators.required]),
    categoryIdUpdate : new FormControl('',[Validators.required]),

  });
  constructor(
    public productService: ProductsService,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: productModel[]) => {
      this.products = data;
      console.log(this.products);
    });
    this.GetCategory();
  }

  GetProduct() {
    this.productService.getProduct().subscribe((data: productModel[]) => {
      this.products = data;
      console.log(this.products);
    });
  }
  GetCategory() {
    this.categoryService.getCategoryList().subscribe((data: ICategory[]) => {
      this.categories = data;
    });
  }

  Search() {
    if (this.productName == '') {
      this.ngOnInit();
    } else {
      this.products = this.products.filter((res) => {
        return res.Name.toLowerCase().match(this.productName.toLowerCase());
      });
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  Sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onAddProductFormSubmit(formGroup: FormGroup) {
    let product = new productModel(
      this.addProductForm.value.idAdd,
      this.addProductForm.value.nameAdd,
      this.addProductForm.value.amountAdd,
      this.addProductForm.value.priceAdd,
      this.addProductForm.value.detailsAdd,
      this.addProductForm.value.imageAdd,
      this.addProductForm.value.statusAdd,
      this.categorySelected
    );
    
    console.log(product);
    this.productService.addProduct(product).subscribe(() => {
      this.GetProduct();
    });
    this.addProductForm.reset();
  }

  loadDelete(id : number)
  {
      this.idDelete = id;
  }
  onDeleteProductFormSubmit(){
    this.productService.deleteProduct(this.idDelete).subscribe( () => this.GetProduct());
  }

  loadUpdate(id : number){
    this.productService.getProductById(id).subscribe( products => {
      this.updateProductForm.controls['idUpdate'].setValue(products.Id);
      this.updateProductForm.controls['nameUpdate'].setValue(products.Name);
      this.updateProductForm.controls['amountUpdate'].setValue(products.Amount);
      this.updateProductForm.controls['priceUpdate'].setValue(products.Price);
      this.updateProductForm.controls['detailsUpdate'].setValue(products.Details);
      this.updateProductForm.controls['imageUpdate'].setValue(products.Image);
      this.updateProductForm.controls['statusUpdate'].setValue(products.Status);
      this.updateProductForm.controls['categoryIdUpdate'].setValue(products.Category_Id);
    });
  }

  onUpdateProductFormSubmit(){
    let id : number = this.updateProductForm.value.idUpdate;
    let product : productModel = {
      Id : this.updateProductForm.value.idUpdate,
      Name : this.updateProductForm.value.nameUpdate,
      Amount : this.updateProductForm.value.amountUpdate,
      Price : this.updateProductForm.value.priceUpdate,
      Details : this.updateProductForm.value.detailsUpdate,
      Image : this.updateProductForm.value.imageUpdate,
      Status : this.updateProductForm.value.statusUpdate,
      Category_Id : this.updateProductForm.value.categoryIdUpdate,
      
    }
    console.log(product);
    this.productService.updateProduct(product).subscribe( () => this.GetProduct());
    this.updateProductForm.reset();
  }

  

  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      const target= event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onSelect(event: any) {}

  selectForUpdate() {}
  update() {}
  deleteConForm() {}
  selectForDelete() {}
}
