import { orderDetailsModel } from './../models/orderDetails.model';


import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { orderModel } from '../models/order.model';
import { map } from 'rxjs/operators';
import { productModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }
  order = new ReplaySubject<orderModel>(1);
  order$ = this.order.asObservable();

  getOrders(): Observable<orderModel[]> {
    return this.http.get<orderModel[]>(this.urlAPI + "/Orders");
  }

  getOrderById(id: number): Observable<orderModel> {
    return this.http.get<orderModel>(this.urlAPI + "/Orders/" + id.toString());
  }

  createOrder(formData: FormData): Observable<orderModel> {
    if (formData === null) {
      console.log("Null");
    }
    return this.http.post<orderModel>(this.urlAPI + "/Orders", formData).pipe(
      map((res: orderModel) => {
        const orderItem = res;
        if (orderItem) {
          this.order.next(orderItem);

        } else {
          this.order.next(null!);
        }
        return orderItem;
      })
    );;
  }

  updateOrderStatus(id: number): Observable<orderModel> {
    return this.http.put<orderModel>(this.urlAPI + "/Orders/" + id.toString(), id);
  }
}