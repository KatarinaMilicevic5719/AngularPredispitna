import { Component, OnInit } from '@angular/core';
import { CartService } from '../../share/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  totalNumber:number=0;
   constructor(
     private cartService:CartService
   ){}
  
   ngOnInit(): void {
    this.cartService.totalCountListener$.subscribe(item=>{
      if(item) this.GetNumberOfCart();
    })
    this.cartService.totalCountListener$.next(true)
   }
   GetNumberOfCart(){
    this.totalNumber=this.cartService.totalCount();
   }
}
