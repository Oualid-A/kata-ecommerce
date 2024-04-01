import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  constructor() {
    const itemsInCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.itemsInCartSubject.next(itemsInCart);
  }

  public addToCart(item: Product) {
    let currentItems = this.itemsInCartSubject.value;
    
    currentItems.push(item);
    this.itemsInCartSubject.next(currentItems);
    localStorage.setItem('cartItems', JSON.stringify(currentItems));
  }

  public removeFromCart(index: number) {
    let currentItems = this.itemsInCartSubject.value;
    const myItems = currentItems.filter((item) => item.id !== index);
    this.itemsInCartSubject.next(myItems);
    localStorage.setItem('cartItems', JSON.stringify(myItems));
  }

  public clearCart() {
    this.itemsInCartSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getCartItemCount(): Observable<number> {
    return this.itemsInCartSubject
      .asObservable()
      .pipe(map((items) => items.length));
  }
}
