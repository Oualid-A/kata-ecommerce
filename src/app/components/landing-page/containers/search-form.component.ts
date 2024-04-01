import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'kep-serch-form',
  template: `<div class=" p-4 w-full">
  <div class="flex flex-wrap -mx-2 space-y-4">
    <mat-form-field appearance="fill" class="w-full  px-2">
      <mat-label>Search</mat-label>
      <input matInput placeholder="Type to search..." [(ngModel)]="searchQuery" (ngModelChange)="applyFilter()" class="w-full">
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
  </div>
</div>
 `,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatIconModule],
})
export class SearchFormComponent {
  searchQuery: string = "";
  @Output() searchChanged = new EventEmitter<string>();

  applyFilter() {
    this.searchChanged.emit(this.searchQuery);
  }
}
