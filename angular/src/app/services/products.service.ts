
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  getProduct(): Observable<productModel[]> {
    return this.http.get<productModel[]>(this.urlAPI + "/Products");
  }

  getProductById(id: number): Observable<productModel> {
    return this.http.get<productModel>(this.urlAPI + "/Products/" + id.toString());
  }

  getProductByName(name: string): Observable<productModel> {
    return this.http.get<productModel>(this.urlAPI + "/Products/search/" + name);
  }


  addProduct(formDate: FormData) {
    let httpHeaders = new HttpHeaders().append('Accept', 'multipart/form-data');
    let options = { headers: httpHeaders };
    return this.http.post<productModel>(this.urlAPI + "/Products", formDate, options);
  }

  deleteProduct(id: number) {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.delete<number>(this.urlAPI + "/Products/" + id);
  }

  updateProduct(formData: FormData) {
    let httpHeaders = new HttpHeaders().append('Accept', 'multipart/form-data');
    let options = { headers: httpHeaders };
    return this.http.put<productModel>(this.urlAPI + "/Products/" + formData.get("Id"), formData, options);
  }

  test(formData: FormData) {
    let httpHeaders = new HttpHeaders().append('Accept', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<productModel>(this.urlAPI + "/Products/Hello", formData, options);
  }
}
