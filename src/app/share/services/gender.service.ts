import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../intefaces/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(
    private http:HttpClient
  ) { }
  getGenders():Observable<Gender[]>{
    return this.http.get<Gender[]>("assets/data/categories.json");
  }
}
