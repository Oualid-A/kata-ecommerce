import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'kep-pay-form',
  template: `
    <section class="border-r-2">
      <div class="max-w-lg mx-auto p-4 w-full">
        <form [formGroup]="payForm" (ngSubmit)="onSubmit()" >
          <h1 class="text-sm text-slate-700 text-center mb-3">
            Express Checkout
          </h1>
          <div
            class="flex justify-stretch w-full mb-4 space-x-4 max-[320px]:flex-col max-[320px]:justify-start max-[320px]:items-start max-[320px]:space-x-0 max-[320px]:space-y-2"
          >
            <button
              class="border text-white px-4  shadow-lg w-full min-h-9 min-w-20"
            >
              <img src="../../../assets/shopPay.png" alt="paypal" />
            </button>
            <button
              class="bg-yellow-400 text-white px-4  shadow-lg w-full min-h-9 min-w-20"
            >
              <img src="../../../assets/Paypal-logo.png" alt="paypal" />
            </button>
            <button
              class="bg-black text-white px-4  shadow-lg w-full min-h-9 min-w-20"
            >
              <img src="../../../assets/Google_Pay_Logo.svg.png" alt="paypal" />
            </button>
          </div>
          <!-- Contact Information -->
          <div>
            <h1 class="text-2xl mb-3 font-semibold">Contact</h1>
            <mat-form-field appearance="fill" class="w-full mb-4">
              <mat-label>Email or mobile phone number</mat-label>
              <input
                matInput
                formControlName="email"
                placeholder="example@example.com"
              />
              <mat-error *ngIf="payForm.get('email')?.errors?.['required']"
                >Email is required</mat-error
              >
              <mat-error *ngIf="payForm.get('email')?.errors?.['email']"
                >Please enter a valid email</mat-error
              >
            </mat-form-field>
          </div>

          <!-- Delivery Information -->
          <div>
            <h1 class="text-2xl mb-3 font-semibold">Delivery</h1>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <mat-form-field appearance="fill" class="w-full">
                <mat-label>First Name</mat-label>
                <input
                  matInput
                  formControlName="firstName"
                  placeholder="Enter a first name"
                />
                <mat-error
                  *ngIf="payForm.get('firstName')?.errors?.['required']"
                  >First name is required</mat-error
                >
              </mat-form-field>

              <mat-form-field appearance="fill" class="w-full">
                <mat-label>Last Name</mat-label>
                <input
                  matInput
                  formControlName="lastName"
                  placeholder="Enter a last name"
                />
                <mat-error *ngIf="payForm.get('lastName')?.errors?.['required']"
                  >Last name is required</mat-error
                >
              </mat-form-field>
            </div>

            <mat-form-field appearance="fill" class="w-full mb-4">
              <mat-label>Address</mat-label>
              <input
                matInput
                formControlName="address"
                placeholder="Enter an address"
              />
              <mat-error *ngIf="payForm.get('address')?.errors?.['required']"
                >Address is required</mat-error
              >
            </mat-form-field>

            <div class="grid grid-cols-2 gap-4">
              <mat-form-field appearance="fill" class="w-full">
                <mat-label>Postal Code</mat-label>
                <input
                  matInput
                  formControlName="postalCode"
                  placeholder="Enter a postal code"
                />
                <mat-error
                  *ngIf="payForm.get('postalCode')?.errors?.['required']"
                  >Postal code is required</mat-error
                >
              </mat-form-field>

              <mat-form-field appearance="fill" class="w-full">
                <mat-label>City</mat-label>
                <input
                  matInput
                  formControlName="city"
                  placeholder="Enter a city"
                />
                <mat-error *ngIf="payForm.get('city')?.errors?.['required']"
                  >City is required</mat-error
                >
              </mat-form-field>
            </div>

            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Apartment, suite, etc. (optional)</mat-label>
              <input
                matInput
                formControlName="apartment"
                placeholder="Enter details"
              />
            </mat-form-field>
          </div>

          <!-- Payment Details -->
          <fieldset class="mt-6">
            <legend class="text-2xl font-semibold">Payment Details</legend>
            <mat-form-field appearance="fill" class="w-full mt-4">
              <mat-label>Credit Card Number</mat-label>
              <input
                matInput
                formControlName="creditCard"
                placeholder="1234 5678 9123 1234"
              />
              <mat-error *ngIf="payForm.get('creditCard')?.errors?.['required']"
                >Credit card number is required</mat-error
              >
              <mat-error *ngIf="payForm.get('creditCard')?.errors?.['pattern']"
                >Invalid credit card format</mat-error
              >
            </mat-form-field>

            <div class="flex justify-between items-center space-x-4">
              <mat-form-field appearance="fill" class="w-full mt-4">
                <mat-label>CVV</mat-label>
                <input matInput formControlName="cvv" placeholder="123" />
                <mat-error *ngIf="payForm.get('cvv')?.errors?.['required']"
                  >CVV is required</mat-error
                >
                <mat-error *ngIf="payForm.get('cvv')?.errors?.['pattern']"
                  >Invalid CVV</mat-error
                >
              </mat-form-field>

              <mat-form-field appearance="fill" class="w-full mt-4">
                <mat-label>Date of Expiry</mat-label>
                <input matInput type="month" formControlName="expiryDate" />
                <mat-error
                  *ngIf="payForm.get('expiryDate')?.errors?.['required']"
                  >Expiry date is required</mat-error
                >
              </mat-form-field>
            </div>
          </fieldset>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!payForm.valid"
            class="w-full mt-6 rounded-none"
          >
            Check Out
          </button>
        </form>
      </div>
    </section>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatFormFieldModule,
    NgIf,
  ],
})
export class PayFormComponent implements OnInit {
  payForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.payForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      creditCard: [
        '',
        [
          Validators.required,
          Validators.pattern('\\d{4} \\d{4} \\d{4} \\d{4}'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('\\d{3}')]],
      expiryDate: ['', Validators.required],
      apartment: [''],
      offers: [false],
    });
  }

  onSubmit() {
    console.log(this.payForm.value);
    if (this.payForm.valid) {
        alert("Payment has been submitted successfully");
        this.payForm.reset();
    }
  }
}
