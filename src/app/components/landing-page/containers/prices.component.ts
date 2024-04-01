import { NgFor, AsyncPipe, NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";


@Component({
    selector: "kep-price",
    template: `
     <div class=" mx-auto p-4 w-full m-auto">
      <div class="flex flex-wrap -mx-2 space-y-4" >
        <mat-form-field appearance="fill" class="w-full  px-2">
          <mat-label>Price</mat-label>
          <mat-select
            [(value)]="selectedPrice"
            (selectionChange)="applyFilter(selectedPrice)"
          >
          <mat-option value="All">
             All
            </mat-option>
            <mat-option *ngFor="let price of prices$ " [value]="price">
              {{ price }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>
    `,
    standalone: true,
    imports:[
        NgFor,
        AsyncPipe,
        MatCardModule,
        NgIf, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
    ]
})

export class PriceComponent {
    prices$: string[] = ["0 MAD - 100 MAD", "101 MAD - 300 MAD", "301 MAD - 1000 MAD"];
    selectedPrice!: string;
    @Output() priceSelected = new EventEmitter<string>();
    applyFilter(selectedPrice:string) {
        this.priceSelected.emit(selectedPrice);
    }
    
}