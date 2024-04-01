import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #_api = environment.apiUrl;
  readonly #_getAllProducts = this.#_api + '/products';
  readonly #_getProductsByCategory = this.#_api + '/products/category/';
  readonly #_getCategories = this.#_api + '/products/categories';
  readonly #_getProductById = this.#_api + '/products/';

  readonly #_http = inject(HttpClient);

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.#_http.get<Product[]>(this.#_getProductsByCategory + category).pipe(
      map((products: Product[]) => products),
      catchError((error: HttpErrorResponse) =>  this.handleError(error))
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.#_http.get<Product[]>(this.#_getAllProducts).pipe(
      map((products: Product[]) => {
        return products;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.#_http.get<Product>(this.#_getProductById + id ).pipe(
      map((products: Product) => {
        return products;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getCategories(): Observable<string[]> {
    return this.#_http.get<string[]>(this.#_getCategories).pipe(
      switchMap((category) => {
        return of(category);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Oups some thing's wrong";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
