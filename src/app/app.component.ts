import { Component, inject } from '@angular/core';
import { CartService } from './components/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'kep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kata-ecommerce-project';
  showCart = false;
  cartItemCount$: Observable<number>;
  private cartService = inject(CartService);
  constructor() {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
