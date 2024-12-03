import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../intefaces/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http:HttpClient
  ) { }
  getBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>("assets/data/brands.json")
  }
}
