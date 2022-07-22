import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NecklaceComponent } from './components/necklace/necklace.component';
import { RingsComponent } from './components/rings/rings.component';
import { BraceletsComponent } from './components/bracelets/bracelets.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EarringsComponent } from './components/earrings/earrings.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HeadersInterceptor } from './interceptor/headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NecklaceComponent,
    RingsComponent,
    BraceletsComponent,
    EarringsComponent,
    HomepageComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    
    
    
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : HeadersInterceptor,
      multi : true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
