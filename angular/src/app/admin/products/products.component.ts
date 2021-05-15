import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/product.model';
import { ICategory } from 'src/app/models/category.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

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
  imageUrl: string = "../assets/boxed-bg.jpg";
  fileToUpload!: File;
  idDelete: number = 1;
  listStatus = ["Còn hàng", "Hết hàng"]
  productUpdate!: productModel;

  addProductForm = this.fb.group({
    nameAdd: ['', [Validators.required]],
    amountAdd: [0, [Validators.required]],
    priceAdd: [0, [Validators.required]],
    detailsAdd: [, [Validators.required]],
    imageAdd: ['', [Validators.required]],
    statusAdd: ['', [Validators.required]],
    categoryIdAdd: ['', [Validators.required]],
  });

  constructor(
    public fb: FormBuilder,
    public productService: ProductsService,
    public categoryService: CategoryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetProduct();
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
    const file = this.fileToUpload;
    if (file) {
      let product = new productModel(
        0,
        this.addProductForm.get('nameAdd')?.value,
        this.addProductForm.get('amountAdd')?.value,
        this.addProductForm.get('priceAdd')?.value,
        this.addProductForm.get('detailsAdd')?.value,
        file.name,
        this.fileToUpload,
        this.addProductForm.get('statusAdd')?.value,
        this.categorySelected
      );
      var formData = new FormData();
      formData.append("Name", product.Name);
      formData.append("Amount", product.Amount.toString());
      formData.append("Price", product.Price.toString());
      formData.append("Image", product.Image);
      formData.append("ImageFile", product.ImageFile);
      formData.append("Details", product.Details);
      formData.append("Status", product.Status);
      formData.append("Category_Id", product.Category_Id.toString());

      console.log(product);


      this.productService.addProduct(formData).subscribe((res) => {
        console.log(res);
        if (res ) {
          // this.products.push(product)
          this.toastr.success("Thêm sản phẩm thành công", "Thông báo thành công");
        }
      },
        err => {
          this.toastr.error("Thêm sản phẩm thất bại : " + err, "Thông báo không thành công");
        }
      );
    } else {
      this.toastr.error("Hãy kiểm tra lại thông tin  ", "Thông báo không thành công");
    }



  }

  loadDelete(id: number) {
    this.idDelete = id;
  }
  onDeleteProductFormSubmit() {
    this.productService.deleteProduct(this.idDelete).subscribe(() => this.GetProduct());
  }

  loadUpdate(id: number) {
    // this.productService.getProductById(id).subscribe( products => {
    //   id,
    //   this.addProductForm.controls['nameUpdate'].setValue(products.Name);
    //   this.addProductForm.controls['amountUpdate'].setValue(products.Amount);
    //   this.addProductForm.controls['priceUpdate'].setValue(products.Price);
    //   this.addProductForm.controls['detailsUpdate'].setValue(products.Details);
    //   this.addProductForm.controls['imageUpdate'].setValue(products.Image);
    //   this.addProductForm.controls['statusUpdate'].setValue(products.Status);
    //   this.addProductForm.controls['categoryIdUpdate'].setValue(products.Category_Id);
    // });
  }

  onUpdateProductFormSubmit(id: number) {
    const file = this.fileToUpload;
    console.log(file);
    if (file) {

      this.productUpdate = new productModel(
        id,
        this.addProductForm.get('nameAdd')?.value,
        this.addProductForm.get('amountAdd')?.value,
        this.addProductForm.get('priceAdd')?.value,
        this.addProductForm.get('detailsAdd')?.value,
        file.name,
        this.fileToUpload,
        this.addProductForm.get('statusAdd')?.value,
        this.categorySelected
      );

      var formData = new FormData();
      formData.append("Id", id.toString());
      formData.append("Name", this.productUpdate.Name);
      formData.append("Amount", this.productUpdate.Amount.toString());
      formData.append("Price", this.productUpdate.Price.toString());
      formData.append("Image", this.productUpdate.Image);
      formData.append("ImageFile", this.productUpdate.ImageFile);
      formData.append("Details", this.productUpdate.Details);
      formData.append("Status", this.productUpdate.Status);
      formData.append("Category_Id", this.productUpdate.Category_Id.toString());




      this.productService.updateProduct(formData).subscribe((res) => {
        console.log(res);
        if (res) {
          this.toastr.success("Cập nhât thành công", "Thông báo thành công");
        }
      },
        err => {
          this.toastr.error("Cập nhât thất bại : " + err, "Thông báo không thành công");
        }
      );
    } else {
      this.toastr.error("Cập nhật thất bại  ", "Thông báo không thành công");
    }

  }




  onSelect(event: any) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }
  }

  selectForUpdate() { }
  update() { }
  deleteConForm() { }
  selectForDelete() { }
}
