import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/e-commerce');
  }
}
