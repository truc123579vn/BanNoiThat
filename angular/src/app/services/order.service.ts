
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderModel } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  urlAPI = environment.urlAPI;

  constructor(private http:HttpClient){}

  getOrders():Observable<orderModel[]>{
    return this.http.get<orderModel[]>(this.urlAPI+"/Orders");
  }
  
  getOrderById(id:number):Observable<orderModel>{
    return this.http.get<orderModel>(this.urlAPI+"/Orders/"+id.toString());
  }
}