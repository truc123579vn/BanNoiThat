import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlAPI = environment.urlAPI;

  constructor(private http:HttpClient) { }

  login(formData:FormData){
    return this.http.post(this.urlAPI+"/AppUsers/Login",formData)
  }

  getUserProfile(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+sessionStorage.getItem('token')});
    return this.http.get(this.urlAPI+"/UserProfile",{headers:tokenHeader});
  }

}
