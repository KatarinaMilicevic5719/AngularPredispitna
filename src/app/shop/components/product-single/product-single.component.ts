import { Component, OnInit,inject } from '@angular/core';
import { Product } from '../../../share/intefaces/product';
import { ProductService } from '../../../share/services/product.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { CategoryService } from '../../../share/services/category.service';
import { Category } from '../../../share/intefaces/category';
import { CartService } from '../../../share/services/cart.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.css'
})
export class ProductSingleComponent implements OnInit {
 product:Product|null=null
 relatedProducts:Product[]=[];
 categories:Category[]|null=null
 quantity:number=1;

 private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

 constructor(
  private productService:ProductService,
  private categoryService:CategoryService,
  private cartService:CartService,


  private activeRoute:ActivatedRoute,
  private router:Router,
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
          this.relatedProducts = data.filter(item => 
            product.brandId === item.brandId && product.id !== item.id
          );
          console.log(this.relatedProducts);  
          console.log(product.specifications.color);  
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
   });
 }
 GetCategoryForProduct(categoryId:number|undefined){
   let category=this.categories?.find(item=>item.id==categoryId);
   if(category!=undefined)return category?.name
   else
   return "unknow";
 }
 redirectFromSingleToSingle(productId:number){
  this.router.navigate(['/shop']).then(()=>{
    this.router.navigate(['/shop',productId])
  })
 }
 quantityChange(type:string){
  if(type==='up') this.quantity=this.quantity+1;
  else {
    if(this.quantity<=1) this.quantity=1;
    else this.quantity=this.quantity-1;
  }
  
 }
 addtoCart(productId:number|undefined,quantity:number){
   if(productId!=undefined){
    this.cartService.addToCart(productId,quantity);
    this.cartService.totalCountListener$.next(true);
   }
 }
 openSnackBar() {
  this.cartService.toastText$.subscribe(item=>{
    this._snackBar.open(item, 'Close', {
     horizontalPosition: this.horizontalPosition,
     verticalPosition: this.verticalPosition,
     duration:5000
   });
 
  })
 }

}
