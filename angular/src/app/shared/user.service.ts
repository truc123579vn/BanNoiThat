import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlAPI = environment.urlAPI;
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  login(formData: FormData) {
    return this.http
      .post<IUser>(this.urlAPI + '/AppUsers/Login', formData)
      .pipe(
        map((response: IUser) => {
          var  user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            console.log(user);
            this.currentUser.next(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null!);
  }

  loadCurrentUser(token: any) {
    if (token === null) {
      this.currentUser.next(null!);
    }
    return this.http
      .get<IUser>(this.urlAPI + '/UserProfile') 
      .pipe(
        map((user: IUser) => {
          if (user) {
            // localStorage.setItem('token', user.token);
            this.currentUser.next(user);
          }
        })
      );
  }
}
