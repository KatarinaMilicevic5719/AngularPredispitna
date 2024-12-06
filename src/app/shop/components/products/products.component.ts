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
import { CartService } from '../../../share/services/cart.service';

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
  minPrice:number=20;
  maxPrice:number|null|undefined=null;
  currentPrice:|number|null=null;
  sliderStyle:string = '';
  
   

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
    private cartService:CartService,
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
    this.maxPrice=this.getMaxPrice();
    this.currentPrice=this.maxPrice;
    this.updateSliderStyle();
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
  const validCurrentValue = this.currentPrice ?? this.minPrice;
   this.filteredProducts=this.filteredProducts.filter(
    product=>product.price.current<=validCurrentValue
   )

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
    this.ngOnInit();
    this.updateSliderStyle();
  }
  checkListAndDeselectChecked(list:QueryList<ElementRef>|undefined){
    list?.forEach((elem:ElementRef)=>{
      elem.nativeElement.checked=false;
    });
  }
  addToCart(productId:number){
    this.cartService.addToCart(productId);
    this.cartService.totalCountListener$.next(true);
  }
  getMaxPrice(){
    let productsExist=localStorage.getItem("products");
    if(productsExist!=null){
      let products:Product[]=JSON.parse(productsExist);
      let max=Math.max(...products.map(product=>product.price.current))
      return max;
    }
    return 0
  }
  updateSliderStyle(){
    const min = this.minPrice ?? 0; 
    const max = this.maxPrice ?? 100;
    const currentValue = this.currentPrice ?? min;  // Ako je currentValue null ili undefined, koristi min kao default

    // Ako je min veći od max, zamenjuj ih
    if (min > max) {
      this.sliderStyle = '';
      return;
    }

    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Stil za bojenje pozadine
    if (currentValue === max) {
        
      this.sliderStyle = `
        background: linear-gradient(to right, #ffba00 100%, #ffba00 100%);
      `;
    } else {
      this.sliderStyle = `
        background: linear-gradient(to right, #ffba00 ${percentage}%, #ccc ${percentage}%);
      `;
    }
  }
  

}
