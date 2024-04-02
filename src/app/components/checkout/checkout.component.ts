import { NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable, map } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cartItems.model';
import { CartService } from '../cart/cart.service';
import { PayFormComponent } from './containers/pay-form.component';

@Component({
  selector: 'kep-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, NgFor, AsyncPipe, PayFormComponent
  ]
})
export class CheckoutComponent {
  items$: Observable<CartItem[]>
  private cartService = inject(CartService)
  constructor(){
    this.items$ = this.cartService.getItems();    
  }

  get total$(): Observable<number> {
    return this.items$ .pipe(
      map(items => items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
    );
  }

}
