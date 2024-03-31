import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from '../cart.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'kep-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  imports: [
    NgFor,
    AsyncPipe,
    MatCardModule,
  ]
})
export class ShoppingCartComponent {
  items$: Observable<Product[]>;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.getItems();
  }
  removeItem(id: number){
    this.cartService.removeFromCart(id);
  }
 
}
