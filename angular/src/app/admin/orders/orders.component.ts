import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { orderModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Observable<orderModel[]> = this.orderService.getOrders();
  url = 'https://localhost:5001/api';
  constructor(
    private orderService: OrderService,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.http.get(this.url + '/orders').subscribe(data => console.log(data),
    error => console.log(error)
    )
  }
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
