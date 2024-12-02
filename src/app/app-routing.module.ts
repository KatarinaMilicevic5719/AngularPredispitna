import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:'home'
  },
  {
    path:"home",
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:"shop",
    loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)
  },
  {
    path:"contact",
    loadChildren:()=>import('./contact/contact.module').then(m=>m.ContactModule)
  },
  {
    path:"cart",
    loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
