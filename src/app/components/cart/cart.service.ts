import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cartItems.model';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);

  constructor() {
    const itemsInCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.itemsInCartSubject.next(itemsInCart);
  }

  public addToCart(product: Product, quantity: number = 1) {
    let currentItems = this.itemsInCartSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);
    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this.itemsInCartSubject.next(currentItems);
    localStorage.setItem('cartItems', JSON.stringify(currentItems));
  }


  public removeFromCart(index: number) {
    let currentItems = this.itemsInCartSubject.value;
    const myItems = currentItems.filter((item) => item.product.id !== index);
    this.itemsInCartSubject.next(myItems);
    localStorage.setItem('cartItems', JSON.stringify(myItems));
  }

  public clearCart() {
    this.itemsInCartSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  public updateItemQuantity(productId: number, quantity: number) {
    let currentItems = this.itemsInCartSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === productId);
    if (existingItemIndex !== -1 && quantity > 0) {
      currentItems[existingItemIndex].quantity = quantity;
    } else if (existingItemIndex !== -1 && quantity === 0) {
      currentItems.splice(existingItemIndex, 1);
    }
    this.itemsInCartSubject.next(currentItems);
    localStorage.setItem('cartItems', JSON.stringify(currentItems));
  }

  public getItems(): Observable<CartItem[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getCartItemCount(): Observable<number> {
    return this.itemsInCartSubject
      .asObservable()
      .pipe(map((items) => items.reduce((count, item) => count + item.quantity, 0)));
  }

  increaseQuantity(id: number){
    let currentItems = this.itemsInCartSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === id);
    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity++;
    }
    this.itemsInCartSubject.next(currentItems);
    localStorage.setItem('cartItems', JSON.stringify(currentItems));
  }
  decreaseQuantity(id: number){
    let currentItems = this.itemsInCartSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === id);
    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity--;
    }
    this.itemsInCartSubject.next(currentItems);
    localStorage.setItem('cartItems', JSON.stringify(currentItems));
  }

  public getCartTotal(): Observable<number> {
    return this.itemsInCartSubject.asObservable().pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
  }
}
