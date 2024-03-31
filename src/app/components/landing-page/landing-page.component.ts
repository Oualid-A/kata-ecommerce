import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoriesComponent } from './containers/categories.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { SearchFormComponent } from './containers/search-form.component';

@Component({
  selector: 'kep-landing-page',
  templateUrl: './landing-page.component.html',
  standalone: true,
  imports:[
    CategoriesComponent, 
    ProductListComponent,
    SearchFormComponent
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  selectedCategory: string = '';
  searchQuery: string = '';

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
  onSearchChanged(query: string): void {
    this.searchQuery = query;
    console.log(this.searchQuery);
    
  }
}
