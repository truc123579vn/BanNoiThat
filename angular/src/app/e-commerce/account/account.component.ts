import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user!:IUser;

  constructor(private router:Router,private service:UserService) { }

  ngOnInit(): void {
     this.service.currentUser$.pipe(take(1)).subscribe(
       user =>{
         this.user = user; 
       }
     )
  } 

  logOut(){
    this.service.logout();
    this.router.navigateByUrl("/e-commerce/home");
  }
} 
