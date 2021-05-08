import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.service.logout();
    this.router.navigateByUrl("/admin");
  }
}
