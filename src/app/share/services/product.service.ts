import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../intefaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>("assets/data/products.json");
  }
}
