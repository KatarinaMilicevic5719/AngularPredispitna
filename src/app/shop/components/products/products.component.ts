import { Component, OnInit } from '@angular/core';
import { Product } from '../../../share/intefaces/product';
import { ProductService } from '../../../share/services/product.service';
import { Category } from '../../../share/intefaces/category';
import { Brand } from '../../../share/intefaces/brand';
import { Gender } from '../../../share/intefaces/gender';
import { CategoryService } from '../../../share/services/category.service';
import { BrandService } from '../../../share/services/brand.service';
import { GenderService } from '../../../share/services/gender.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products:Product[]=[]
  categories:Category[]=[]
  brands:Brand[]=[]
  genders:Gender[]=[]

  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private brandsService:BrandService,
    private genderService:GenderService,

    private router:Router
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(data)=>{
        this.products=data
        console.log(this.productService);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
    this.categoryService.getCategories().subscribe({
      next:(data)=>{
        this.categories=data
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.brandsService.getBrands().subscribe({
      next:(data)=>{
        this.brands=data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.genderService.getGenders().subscribe({
      next:(data)=>{
        this.genders=data
        console.log(this.genders)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  redirectToSinglePage(id:number){
    alert("Kliknuto");
    this.router.navigateByUrl("/shop/"+id);
  }

}
