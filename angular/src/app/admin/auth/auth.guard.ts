import { UserService } from 'src/app/shared/user.service';
import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {
  /**
   *
   */
  flag:boolean = false;
  constructor(private userService:UserService,private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    this.userService.isCustomer().subscribe(
      res => {
        if (res) {
          console.log("This")
          localStorage.removeItem("token");
          this.userService.setNullCurrentUser();
          location.reload();
          return false;
        } else {
         
          this.router.navigateByUrl("/admin/index");
          return true;
        }
      }
      
    )
      return false;
    
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLogin()) {
      return true;

    }
    this.router.navigateByUrl("/admin/login");

    return false;
  }
  
  
}
