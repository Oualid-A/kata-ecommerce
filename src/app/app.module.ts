import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './components/cart/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/components/landing-page/landing-page.component').then(
        (c) => c.LandingPageComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('../app/components/products/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('../app/components/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    ShoppingCartComponent,
    CheckoutComponent,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
