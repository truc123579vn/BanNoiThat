import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() profile:any;
  currentUser$!:Observable<IUser>
  user! : IUser;

  constructor(public router:Router,public service:UserService) { } 

  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;
  } 

  getUserProfile(){
    this.currentUser$.pipe(take(1)).subscribe(
      user =>{
        this.user = user;
      }
    )
  }
  
}
