import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlAPI = environment.urlAPI;
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  /**
   *
   */

  constructor(private http: HttpClient, private cartService: CartService) { }

  login(formData: FormData) {
    return this.http
      .post<IUser>(this.urlAPI + '/AppUsers/Login', formData)
      .pipe(
        map((response: IUser) => {
          var user = response;
          if (user) {
            localStorage.setItem('token', user.token);

            this.currentUser.next(user);

            if (user.role == 'Customer') {
              this.cartService.createCartAfterLogin(user.id);
            }
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('cartId', 'cart_id');
    this.currentUser.next(null!);
    location.replace('/e-commerce');
  }

  loadCurrentUser(token?: any) {
    if (token == null) {
      this.currentUser.next(null!);
      return of(null!);
    }
    return this.http.get<IUser>(this.urlAPI + '/UserProfile').pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUser.next(user);
        }
        return user;
      })
    );
  }

  setNullCurrentUser() {
    this.currentUser.next(null!);
  }

  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser$;
  }

  boolean!: false;
  isCustomer(): Observable<boolean> {
    const result = new Subject<boolean>();
    this.getCurrentUser().pipe(take(1)).subscribe(
      res =>{
        if(res.role === "Customer"){
          result.next(true);
          result.complete();
        }else{
          result.next(false);
          result.complete();
        }
      }
    );
    return result.asObservable();
  }
}
