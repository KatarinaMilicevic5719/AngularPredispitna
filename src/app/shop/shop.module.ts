import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductSingleComponent } from './components/product-single/product-single.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductSingleComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
