import { Injectable } from '@angular/core';
import { Category } from '../intefaces/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>("assets/data/categories.json");
  }
}
