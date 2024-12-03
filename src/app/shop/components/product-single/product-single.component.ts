import { Component, OnInit } from '@angular/core';
import { Product } from '../../../share/intefaces/product';
import { ProductService } from '../../../share/services/product.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { CategoryService } from '../../../share/services/category.service';
import { Category } from '../../../share/intefaces/category';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.css'
})
export class ProductSingleComponent implements OnInit {
 product:Product|null=null
 categories:Category[]|null=null

 constructor(
  private productService:ProductService,
  private categoryService:CategoryService,


  private activeRoute:ActivatedRoute,
  private router:Router
 ){}

 ngOnInit(): void {
   console.log(this.activeRoute.snapshot.params['id']);
   let productId=Number(this.activeRoute.snapshot.params['id']);
   console.log(productId);

   this.productService.getProducts().subscribe({
    next:(data:Product[])=>{
        console.log(data);
        const product=data.find(item=>item.id==productId)
        if(product!=undefined){
          this.product=product
          console.log(product);  
        }
        else this.router.navigateByUrl("/shop");
        
    },
    error:(error)=>{
      console.log(error);
    }
   })
   this.categoryService.getCategories().subscribe({
    next:(data)=>this.categories=data,
    error:(err)=>console.log(err)
   })
 }
 GetCategoryForProduct(categoryId:number|undefined){
   let category=this.categories?.find(item=>item.id==categoryId);
   if(category!=undefined)return category?.name
   else
   return "unknow";
 }

}
