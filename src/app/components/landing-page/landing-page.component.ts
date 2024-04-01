import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoriesComponent } from './containers/categories.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { SearchFormComponent } from './containers/search-form.component';
import { PriceComponent } from './containers/prices.component';

@Component({
  selector: 'kep-landing-page',
  templateUrl: './landing-page.component.html',
  standalone: true,
  imports:[
    CategoriesComponent, 
    ProductListComponent,
    SearchFormComponent,
    PriceComponent
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  selectedCategory: string = '';
  selectedPrice: string = '';
  searchQuery: string = '';

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
  onPriceSelected(price: string): void {
    this.selectedPrice = price;    
  }
  onSearchChanged(query: string): void {
    this.searchQuery = query;    
  }
}
