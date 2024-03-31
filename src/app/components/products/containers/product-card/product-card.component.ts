import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
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
    MatCardModule, MatButtonModule, NgFor,AsyncPipe
  ]
})
export class ProductCardComponent {
  @Input() products !: Observable<Product[]>;
  @Input() prod!: Product;

  private cartService = inject(CartService) ;
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
