
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  urlAPI = environment.urlAPI;

  constructor(private http:HttpClient){}

  getProduct():Observable<productModel[]>{
    return this.http.get<productModel[]>(this.urlAPI+"/Products");
  }
  
  getProductById(id:number):Observable<productModel>{
    return this.http.get<productModel>(this.urlAPI+"/Products/"+id.toString());
  }


  /* AllProducts = new BehaviorSubject<productModel[]>(null);
  constructor(private http:HttpClient)
  {
    //this.getFromDb("");
  }
  
  private baseUrl="http://localhost:4200/API";
  
  public add(form)
  {
    return this.http.post(this.baseUrl + "add", form);
  }
  public delete(id)
  {
    return this.http.post(this.baseUrl + "delete?id=" + id, null);
  }
  public update(form)
  {
    return this.http.post(this.baseUrl + "update", form);
  }
  public getFromDb(key)
  {
    return this.http.post(this.baseUrl + "show?keys=" + keys, null).subscribe(res=>{
      var r : any = res;  
      this.AllProducts.next(r.products)
        )
    });
  } */
}
