import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, startWith, map, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../products.service';
import { NgIf } from '@angular/common';
import { ProductCardComponent } from '../containers/product-card/product-card.component';

@Component({
  selector: 'kep-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [ProductCardComponent, NgIf]
})
export class ProductListComponent implements OnInit {
  private readonly _category = new BehaviorSubject<string>('');
  private readonly _searchQuery = new BehaviorSubject<string>('');
  private readonly _price = new BehaviorSubject<string>('');
  products$!: Observable<Product[]>;
  
  @Input() set category(value: string) {
    this._category.next(value);
  }

  @Input() set searchQuery(value: string) {
    this._searchQuery.next(value);
  }

  @Input() set price(value: string) {
    this._price.next(value);
  }


  constructor(private productService: ProductsService) {}

  ngOnInit(): void {    
    this.products$ = combineLatest([
      this.productService.getAllProducts(),
      this._category.asObservable(),
      this._searchQuery.asObservable(),
      this._price.asObservable()
    ]).pipe(
      map(([products, category, searchQuery, priceRange]) => {
        const [minPrice, maxPrice] = priceRange.split('-').map(p => parseFloat(p));
        return products.filter(product => 
          (category === '' || product.category === category || category === 'All') &&
          (searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase())) && 
          (!priceRange || (product.price >= minPrice && product.price <= maxPrice) || priceRange === 'All')
        );
      })
    );
  }
}
