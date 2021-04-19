import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any=[]
  cartTotal=0

  constructor() { }

  ngOnInit(): void {
    this.cartDetail()  
  }
  cartDetail(){
    if(localStorage.getItem('token'))
    {
        this.items= JSON.parse(localStorage.getItem('token') || '{}')
        console.log(this.items)

        this.cartTotal=0
        this.items.forEach((item: any) => {
        this.cartTotal += (item.qty * item.price)
        })
    }

  }
  increaseQty(product: productModel){
    this.items= JSON.parse(localStorage.getItem('token') || '{}')
      for(let i=0; i<this.items.length;i++)
      {
         if(product.productId===parseInt(this.items[i].productId) && this.items[i].qty< this.items[i].amount){
            this.items[i].qty= product.qty+1 ;
            break;
        }
      }
      this.cartTotal=0
        this.items.forEach((item: any) => {
        this.cartTotal += (item.qty * item.price)
        })
      localStorage.setItem('token', JSON.stringify(this.items))
      location.reload()
      
  }
  
  decreaseQty(product: any){
    this.items= JSON.parse(localStorage.getItem('token') || '{}')
      for(let i=0; i<this.items.length;i++)
      {
         if(product.productId===parseInt(this.items[i].productId) && this.items[i].qty>1){
            this.items[i].qty= product.qty-1 ;
            break;
        }
        if(product.productId===parseInt(this.items[i].productId) && this.items[i].qty==1)
        {
            this.deleteItem(this.items[i])
        }
      }
      
      this.cartTotal=0
        this.items.forEach((item: any) => {
        this.cartTotal += (item.qty * item.price)
        })
      localStorage.setItem('token', JSON.stringify(this.items))
      location.reload() //reload page to update cart total's quality on header
  }
  deleteItem(product: any)
  {
    console.log(product)
    if(localStorage.getItem('token')){
      this.items=JSON.parse(localStorage.getItem('token')||'{}')
      for(let i=0;i<this.items.length;i++){
        if(product.productId===parseInt(this.items[i].productId)){
          this.items.splice(i,1)
          localStorage.setItem('token',JSON.stringify(this.items))
          this.cartDetail()
          location.reload()
        }
      }
    }
  }

  removeallCart(){
    localStorage.removeItem('token')
    this.items=[]
    location.reload()
  }


}



