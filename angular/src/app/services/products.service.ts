import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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
