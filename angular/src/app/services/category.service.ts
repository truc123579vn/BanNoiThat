import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlAPI = environment.urlAPI;
  constructor(private http:HttpClient) { }

  getCategoryList():Observable<ICategory[]>
  {
    return this.http.get<ICategory[]>(this.urlAPI+"/Categories");
  }
}
