import { Component, inject } from '@angular/core';
import { CartService } from './components/cart/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  constructor() {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
  returnToHome(){
    this.router.navigate(['/']);
  }
}
