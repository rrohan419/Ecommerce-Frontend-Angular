import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BraceletsComponent } from './components/bracelets/bracelets.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EarringsComponent } from './components/earrings/earrings.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NecklaceComponent } from './components/necklace/necklace.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RingsComponent } from './components/rings/rings.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'earings', component: EarringsComponent },
  { path: 'bracelets', component: BraceletsComponent },
  { path: 'necklaces', component: NecklaceComponent },
  { path: 'rings', component: RingsComponent },
  { path: 'productdetails', component: ProductDetailsComponent },
  { path: 'productdetailearring/:id', component: ProductDetailsComponent },
  { path: 'productdetailnecklace/:id', component: ProductDetailsComponent },
  { path: 'productdetailring/:id', component: ProductDetailsComponent },
  { path: 'productdetailbracelet/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
