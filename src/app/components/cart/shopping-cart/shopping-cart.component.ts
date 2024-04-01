import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from '../cart.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'kep-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  imports: [
    NgFor,
    AsyncPipe,
    MatCardModule,
    NgIf,
    ReactiveFormsModule
  ]
})
export class ShoppingCartComponent {
  items$: Observable<Product[]>;
  private readonly cartService= inject(CartService);
  constructor() {
    this.items$ = this.cartService.getItems();
  }
  removeItem(id: number){
    this.cartService.removeFromCart(id);
  }
 
  clearCart(){
    this.cartService.clearCart();
  }
}
