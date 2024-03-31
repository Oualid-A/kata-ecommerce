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
  products$!: Observable<Product[]>;
  
  @Input() set category(value: string) {
    this._category.next(value);
  }

  @Input() set searchQuery(value: string) {
    this._searchQuery.next(value);
  }


  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.productService.getAllProducts(),
      this._category.asObservable().pipe(startWith('')),
      this._searchQuery.asObservable().pipe(startWith(''))
    ]).pipe(
      map(([products, category, searchQuery]) => 
        products.filter(product => 
          (category === '' || product.category === category) &&
          (searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
    );
  }
}
