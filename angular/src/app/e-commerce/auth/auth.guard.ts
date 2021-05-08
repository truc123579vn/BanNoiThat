import { IUser } from './../../models/user.model';
import { UserService } from 'src/app/shared/user.service';
import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: UserService) { }
  // cái này là guard để cho người dùng không chuyển địa chỉ tùm lum
  // canActivate là hàm dùng để ràng buộc, component thỏa điều kiện trong hàm này và hàm này trả về true thì mới mở được
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    // kiểm tra có người dùng đăng nhập chưa
    if (this.service.isLogin()) {
      // sau đó kiểm tra người đó có phải là customer hay không, có trả về true, không trả về false;
      if (this.service.isCustomer()) return true;
      return false;

    }
    // nếu chưa đăng nhập chuyển hướng tới trang login, và trả về false
    this.router.navigateByUrl('/e-commerce/login')
    return false;
  }
}

//=>pass