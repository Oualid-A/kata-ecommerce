import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/components/cart/cart.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'kep-product-card',
  templateUrl: './product-card.component.html',
  standalone:true,
  imports:[
    MatCardModule, MatButtonModule, NgFor,AsyncPipe, ReactiveFormsModule, FormsModule, NgIf
  ],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 10 }), { optional: true }),
        query(':enter', stagger('700ms', [
          animate('300ms ease-in', style({ opacity: 1 }))
        ]), { optional: true })
      ])
    ])
  ]
})
export class ProductCardComponent {
  @Input() products !: Observable<Product[]>;
  @Input() prod!: Product;
  showAlert : boolean = false;

  private cartService = inject(CartService) ;
  private router = inject(Router) ;

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  showDetails(product: Product){
    this.router.navigate(['/details', product.id]);
  }
}