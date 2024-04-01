import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'kep-product-details',
  standalone:true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports:[
    NgIf,AsyncPipe
  ]
})
export class ProductDetailsComponent {
  product!: Product;
  quantity: number = 1;
  private route = inject(ActivatedRoute) 
  private productService = inject(ProductsService) 
  private cartService = inject(CartService) 

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
      });
    });
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    this.quantity--;
  }
  addToCart(product: Product, quantity: number ) {
    this.cartService.addToCart(product, quantity);
  }
}
