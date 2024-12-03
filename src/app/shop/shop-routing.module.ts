import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductSingleComponent } from './components/product-single/product-single.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:ProductsComponent
  },
  {
    path:":id",
    component:ProductSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
