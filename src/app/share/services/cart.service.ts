import { Injectable } from '@angular/core';
import { CartItem } from '../intefaces/cart-item';
import { Product } from '../intefaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:CartItem[]=this.getCartItemsFromLocalStorage();
  private products:Product[]=this.getProductsFromLocalStorage();
  totalCountListener$=new BehaviorSubject<boolean>(false);
  

  constructor() { }

  addToCart(id:number){
    console.log(this.products);
    console.log(this.cartItems);
    let existItem=this.cartItems.find(i=>i.id==id);
    if(existItem){
       existItem.quantity=existItem.quantity+1;
       this.saveCartItemsToLocalStorage();
       
    }
    else{
      let itemNew=this.products.find(i=>i.id==id);
     if(itemNew!=undefined){
      let obj:CartItem={
        id:itemNew.id,
        name:itemNew.name,
        image:itemNew.image,
        price:itemNew.price.current,
        quantity:1
      };
      this.cartItems.push(obj);
      this.saveCartItemsToLocalStorage();

     }
    }
  }
   getProductsFromLocalStorage(){
    let productExist=localStorage.getItem("products");
    if(productExist==null) return;
    return JSON.parse(productExist);
   }
   getCartItemsFromLocalStorage(){
    let cartItemsExist=localStorage.getItem("cartItems");
    if(cartItemsExist!=null){
      return JSON.parse(cartItemsExist);
    }
    else{
      let temp_arr:CartItem[]=[];
      return temp_arr;
    }
   }
   saveCartItemsToLocalStorage(){
    localStorage.setItem("cartItems",JSON.stringify(this.cartItems));
    this.totalCount();
   }
   removeItemFromCart(cartItemId:number){
    let tmp_arr:CartItem[]=[];
    this.cartItems.forEach(item=>{
      if(item.id!==cartItemId) tmp_arr.push(item);
    });
    this.cartItems=tmp_arr
    this.saveCartItemsToLocalStorage()
   }
   removeAll(){
    this.cartItems=[];
    this.saveCartItemsToLocalStorage();
   }
   Total(){
    let prod:CartItem[]=this.getCartItemsFromLocalStorage();
    let sum=0;
    prod.forEach(item=>{
      sum+=item.price*item.quantity;
    });
    return Math.round(sum);
   }
   totalCount(){
    let prod:CartItem[]=this.getCartItemsFromLocalStorage();
    return prod.length;
   }
}
