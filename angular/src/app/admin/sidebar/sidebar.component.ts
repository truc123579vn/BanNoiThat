import { UserService } from 'src/app/shared/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser$!:Observable<IUser>
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;
  }

}
