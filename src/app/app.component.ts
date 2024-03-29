import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartServiceService } from './service/cart-service.service';
import { Product } from './service/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assign3';

  cartData: any = [];
  lastSavedQuantity: any;
  cartTotal: any;
  list = this.cartService.productList.asObservable();
  total = this.cartService.cartQuantity.asObservable();
  myCartTotalPrice = this.cartService.totalPrice.asObservable();

  productDiscountedPrice = 0;

  constructor(private cartService: CartServiceService) {
    // cartService.getLocalStorageSavedProducts();
  }


  ngOnInit(): void {
    this.list.subscribe((data: any) => {
      this.cartData = data;
      console.log(this.cartData, "cart data app component");
    });

    this.total.subscribe((data: number) => {
      this.lastSavedQuantity = data;
    });

    this.myCartTotalPrice.subscribe((data) => {
      this.cartTotal = data;
    })

  }
  getAllCartProducts() {
    this.list.subscribe((data) => {
      this.cartData = data;
    });
  }

  clearAllProducts() {
    this.cartService.clearCart();
    this.cartTotal = 0;
    this.cartData = [];
    this.cartService.myCartTotalPrice = JSON.parse('0');
    this.cartService.cartCount = 0;
    this.cartService.cartItem = [];
    localStorage.setItem('cartQuantity', JSON.stringify(0));
    localStorage.setItem('cartProducts', JSON.stringify([]));
    localStorage.setItem('subTotal', JSON.stringify(0));

    // this.lastSavedQuantity = localStorage.getItem('cartQuantity');
  }
  deleteSingleProduct(itemName: any) {

    this.cartService.removeProduct(itemName);

    return this.getAllCartProducts();
  }

}

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./app.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }