import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import{CartService} from './../../services/cart.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items:any=[];
  @Input() profile:any;
 

  constructor(public router:Router, private cartService: CartService) { 
    this.cartService.cartSubject.subscribe((data)=>{
      this.cartItem=data
    })
  }

  ngOnInit(): void {
    this.cartItemFunc()
  }
  cartItem:number=0
  cartItemFunc(){

    this.items= JSON.parse(localStorage.getItem('token') || '{}')
      for(let i=0; i<this.items.length;i++)
      {     
        this.cartItem=this.cartItem + this.items[i].qty;
        
      }
     
  }

  
}
