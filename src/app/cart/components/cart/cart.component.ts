import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../share/intefaces/cart-item';
import { CartService } from '../../../share/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems:CartItem[]=[];
  total:number=0;
  constructor(
    private cartService:CartService
  ){}
  ngOnInit(): void {
   this.getItemsFromLocalStorage();
   this.Total();
  }
  removeAll(){
    this.cartService.removeAll();
    this.getItemsFromLocalStorage();
    this.Total();
    this.cartService.totalCountListener$.next(true);
  }
  getItemsFromLocalStorage(){
    let values=localStorage.getItem("cartItems");
    if(values!=null){
      this.cartItems=JSON.parse(values);
    }
  }
  saveItemsForLocalStorage(){
    localStorage.setItem("cartItems",JSON.stringify(this.cartItems))
    this.Total();
    this.cartService.totalCountListener$.next(true);
  }
  quantityUp(productId:number){
    let cartProduct=this.cartItems.find(i=>i.id==productId)
    if(cartProduct!=undefined){
      cartProduct.quantity=cartProduct.quantity+1;
      }
      this.saveItemsForLocalStorage(); 
        
    }
  quantityDown(productId:number){
    let cartProduct=this.cartItems.find(i=>i.id==productId)
    if(cartProduct!=undefined){
      if(cartProduct.quantity<=1)
        
        return;
      else{
      cartProduct.quantity=cartProduct.quantity-1;
      }
    }
    this.saveItemsForLocalStorage();
    
  }
   removeItem(productId:number){
    this.cartService.removeItemFromCart(productId);
    this.getItemsFromLocalStorage();
    this.Total();
    this.cartService.totalCountListener$.next(true);
   }
   Total(){
    this.total=this.cartService.Total();
    console.log(this.total);
   }
}
