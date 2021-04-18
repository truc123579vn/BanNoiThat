import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { element } from 'protractor';
import { Subject } from 'rxjs'
import { productModel } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any[] = [];


  constructor() { }
  
  
  cartSubject = new Subject<any>()
 
}