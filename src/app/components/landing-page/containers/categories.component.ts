import {AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'kep-categories',
  template: `
    <div class=" mx-auto p-4 w-full m-auto">
      <div class="flex flex-wrap -mx-2 space-y-4" >
        <mat-form-field appearance="fill" class="w-full  px-2">
          <mat-label>Category</mat-label>
          <mat-select
            [(value)]="selectedCategory"
            (selectionChange)="applyFilter(selectedCategory)"
          >
          <mat-option value="All">
             All
            </mat-option>
            <mat-option *ngFor="let category of categories$ | async " [value]="category">
              {{ category }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>
  `,
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  categories$!: Observable<string[]>;
  selectedCategory!: string;

  @Output() categorySelected = new EventEmitter<string>();
  readonly #_productService = inject(ProductsService);

  applyFilter(selectedCategory:string) {
    this.categorySelected.emit(selectedCategory);
  }
  
  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this.categories$ = this.#_productService.getCategories()
  }
}
