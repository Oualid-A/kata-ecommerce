import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from '../cart.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { CartItem } from 'src/app/shared/models/cartItems.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'kep-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  imports: [
    NgFor,
    AsyncPipe,
    MatCardModule,
    NgIf,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class ShoppingCartComponent {
  items$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  private readonly cartService= inject(CartService);
  constructor() {
    this.items$ = this.cartService.getItems();
    this.cartTotal$ = this.cartService.getCartTotal();
  }
  removeItem(id: number){
    this.cartService.removeFromCart(id);
  }
 
  clearCart(){
    this.cartService.clearCart();
  }
  increaseQuantity(id: number){
    this.cartService.increaseQuantity(id);
  }
  decreaseQuantity(id: number){
    this.cartService.decreaseQuantity(id);
  }
  checkout(){
    console.log("Checkout");
    
  }
}
