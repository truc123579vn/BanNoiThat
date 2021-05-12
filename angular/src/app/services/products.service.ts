
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  urlAPI = environment.urlAPI;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient,
              private productsService : ProductsService){}

  getProduct():Observable<productModel[]>{
    return this.http.get<productModel[]>(this.urlAPI+"/Products");
  }
  
  getProductById(id:number):Observable<productModel>{
    return this.http.get<productModel>(this.urlAPI+"/Products/"+id.toString());
  }

  
  addProduct(product : productModel){
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };
      return this.http.post<productModel>(this.urlAPI + "/Products", product, options);
  }

  deleteProduct(id : number)
    {
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };
      return this.http.delete<number>(this.urlAPI +"/Products/" + id);
    }

    updateProduct(product : productModel)
    {
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };
      return this.http.put<productModel>(this.urlAPI + "/Products/"+product.Id, product, options);
    }
  
}
