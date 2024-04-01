import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/components/cart/cart.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'kep-product-card',
  templateUrl: './product-card.component.html',
  standalone:true,
  imports:[
    MatCardModule, MatButtonModule, NgFor,AsyncPipe, ReactiveFormsModule, FormsModule
  ]
})
export class ProductCardComponent {
  @Input() products !: Observable<Product[]>;
  @Input() prod!: Product;
  //quantity: number = 0;
  private cartService = inject(CartService) ;
  
  // increment(){
  //   this.quantity++;
  // }
  // decrement(){
  //   this.quantity--;
  // }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
