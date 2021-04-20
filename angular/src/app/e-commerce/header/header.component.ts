import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() profile:any;
  currentUser$!:Observable<IUser>
  user! : IUser;
  items:any=[];
  constructor(public router:Router,public service:UserService, private cartService: CartService) {this.cartService.cartSubject.subscribe((data)=>{
    this.cartItem=data
  }) }

  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;
    this.cartItemFunc();
  }

  getUserProfile(){
    this.currentUser$.pipe(take(1)).subscribe(
      user =>{
        this.user = user;
      }
    )
  }
  cartItem:number=0
  cartItemFunc(){

    this.items= JSON.parse(localStorage.getItem('cart') || '{}')
      for(let i=0; i<this.items.length;i++)
      {     
        this.cartItem=this.cartItem + this.items[i].qty;

      }

  }
}