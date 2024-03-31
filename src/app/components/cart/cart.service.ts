import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() {
    const itemsInCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.itemsInCartSubject.next(itemsInCart);
  }

  public addToCart(item: Product) {
    let currentItems = this.itemsInCartSubject.value;
    currentItems.push(item);
    this.itemsInCartSubject.next(currentItems);
    this.saveItemsToLocalStorage(currentItems);
  }

  public removeFromCart(index: number) {
    let currentItems = this.itemsInCartSubject.value;
    currentItems.splice(index, 1);
    this.itemsInCartSubject.next(currentItems);
    this.saveItemsToLocalStorage(currentItems);
  }

  public clearCart() {
    this.itemsInCartSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  private saveItemsToLocalStorage(items: Product[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
  public getCartItemCount(): Observable<number> {
    return this.itemsInCartSubject.asObservable().pipe(
      map(items => items.length)
    );
  }
}
