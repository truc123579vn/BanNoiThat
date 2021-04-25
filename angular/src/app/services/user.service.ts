import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { registerModel } from '../models/register.model';


@Injectable({
    providedIn: 'root'
  })
  export class AccountService {
  
  
    urlAPI = environment.urlAPI;
  
    constructor(private http:HttpClient){}
  
    getAccountsManager():Observable<IUser[]>{
      return this.http.get<IUser[]>(this.urlAPI+ "/appusers/GetByRole/Manager");
    }

    getAccountsCustomer():Observable<IUser[]>{
        return this.http.get<IUser[]>(this.urlAPI+ "/appusers/GetByRole/Customer");
      }

      getAccountByUserName(username : string):Observable<IUser>{
        return this.http.get<IUser>(this.urlAPI + "/appusers/" + username);
      }

    createAccountManager(manager : registerModel) 
    {
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };
      return this.http.post<IUser>(this.urlAPI + "/appusers/User/Manager", manager, options);
    }

    updateAccount(account : IUser)
    {
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };
      return this.http.put<IUser>(this.urlAPI + "/appusers/"+account.userName, account, options);
    }

    deleteAccount(username : String)
    {
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = { headers: httpHeaders };
      return this.http.delete<number>(this.urlAPI + "/appusers/"+ username);
    }
    
  }