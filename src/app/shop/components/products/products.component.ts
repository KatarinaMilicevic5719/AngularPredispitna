import { Component, ElementRef, OnInit, QueryList,  ViewChildren } from '@angular/core';
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
  @ViewChildren('brands') brandsElem:QueryList<ElementRef> |undefined;
  @ViewChildren('genders')gendersElem:QueryList<ElementRef>| undefined;
  @ViewChildren('categories') categoriesElem:QueryList<ElementRef>|undefined;


  products:Product[]=[]
  categories:Category[]=[]
  brands:Brand[]=[]
  genders:Gender[]=[]
  selectedCategory: number | null = null;

  filteredProducts=[...this.products];





  selectedFilters={
    category:-1,
    brand:-1,
    gender:-1,
    sort:0
  }
  
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
        localStorage.setItem("products",JSON.stringify(data));
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
    this.router.navigateByUrl("/shop/"+id);
  }
  applyFilters(){
    console.log(this.selectedFilters);
    
    const value = localStorage.getItem("products");
    if (value !== null) {
      this.products = JSON.parse(value);
    }
    this.filteredProducts=this.products;
    console.log(this.filteredProducts);
    
  if (this.selectedFilters.category !== -1) {
    this.filteredProducts = this.filteredProducts.filter(
      product => product.categoryId === this.selectedFilters.category
    );
  }

  if (this.selectedFilters.brand !== -1) {
    this.filteredProducts = this.filteredProducts.filter(
      product => product.brandId === this.selectedFilters.brand
    );
  }
  if (this.selectedFilters.gender !== -1) {
    this.filteredProducts = this.filteredProducts.filter(
      product => product.genderId === this.selectedFilters.gender
    );
  }
  if(this.selectedFilters.sort!== 0){
    if(this.selectedFilters.sort==2){
      this.filteredProducts=this.filteredProducts.sort((a,b)=>b.name.localeCompare(a.name))
    }
    else if(this.selectedFilters.sort!==1){
      this.filteredProducts=this.filteredProducts.sort((a,b)=>a.name.localeCompare(b.name))
    }
  }
  console.log(this.filteredProducts);
  this.products=this.filteredProducts;
  }
  resetAll(){
    this.selectedFilters={
      category:-1,
      brand:-1,
      gender:-1,
      sort:-1
    }
    this.checkListAndDeselectChecked(this.brandsElem);
    this.checkListAndDeselectChecked(this.gendersElem);
    console.log(this.brandsElem);
    this.selectedCategory=null
    console.log(this.categoriesElem)
    console.log(this.gendersElem);
    this.applyFilters();
  }
  checkListAndDeselectChecked(list:QueryList<ElementRef>|undefined){
    list?.forEach((elem:ElementRef)=>{
      elem.nativeElement.checked=false;
    });
  }
  
  

}
