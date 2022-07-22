import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Coupons } from 'src/app/service/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  savedCartProducts: any;
  totalItem: number = 0;
  totalItemPrice: number = 0;
  discountCoupons: any = Coupons;
  discountApplied: any = 0;
  appliedCoupons: any = '';
  currentProductName: string = '';
  list = this.cartService.productList.asObservable();
  total = this.cartService.cartQuantity.asObservable();
  myCartTotalPrice = this.cartService.totalPrice.asObservable();
  flag: boolean = false;
  totalDiscount: number = 0;
  delivery: number = 0

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {

    this.list.subscribe((data) => {
      this.savedCartProducts = data;
    });
    // console.log(this.savedCartProducts);

    this.total.subscribe((data) => {
      this.totalItem = data;
      // console.log(this.totalItem, "total item in the checkout page");
    });

    this.myCartTotalPrice.subscribe((data) => {
      this.totalItemPrice = data;
      if (this.totalItemPrice === 0) {
        this.delivery = 0;
      }
      else if (this.totalItemPrice < 1500) {
        this.delivery = 100;
      }
      else if (this.totalItemPrice < 3000) {
        this.delivery = 75;
      }
      else if (this.totalItemPrice < 5000) {
        this.delivery = 25;
      }
      else {
        this.delivery = 0;
      }
      // console.log(this.totalItemPrice, "total item price in the chekout page");
    });

  }

  removeProduct(productName: any) {

    for (let i = 0; i < this.savedCartProducts.length; i++) {

      if (this.savedCartProducts[i].name === productName) {
        var cartQuantity = this.totalItem;
        cartQuantity = cartQuantity - this.savedCartProducts[i].quantity
        this.cartService.cartQuantity.next(cartQuantity);
        var cartPrice = this.totalItemPrice;
        cartPrice = cartPrice - (this.savedCartProducts[i].totalPrice);
        this.cartService.totalPrice.next(cartPrice);
        this.savedCartProducts.splice(i, 1);
        this.cartService.productList.next(this.savedCartProducts);

        return this.cartService.getSavedProducts();
        // return;
      }
    }
    return;
  }


  async applyDiscoutCoupons(code: any) {

    console.log(code.value);
    let data ={
      "coupon" : code.value,
      "savedCartProducts" : this.savedCartProducts,
      "totalDiscount" : this.totalDiscount,
      "flag" : this.flag,
      "totalItemPrice" : this.totalItemPrice,
      "discountApplied": this.discountApplied

    }
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('/src/app/service/app.worker', import.meta.url));
      worker.onmessage = ({data}) => {
        this.totalDiscount = data.totalDiscount;
        this.discountApplied = data.discountApplied;
      
      };
      worker.postMessage(data);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

   
  }


  manageQuantity(quantity: any, productName: any) {

    for (let i = 0; i < this.savedCartProducts.length; i++) {
      if (this.savedCartProducts[i].name === productName) {
        if (this.savedCartProducts[i].quantity > quantity) {
          const temp = this.savedCartProducts[i].quantity - quantity;
          for (let j = 0; j < temp; j++) {
            this.cartService.removeProduct(this.savedCartProducts[i].name);
          }
          return this.cartService.getSavedProducts();
        }
        if (this.savedCartProducts[i].quantity < quantity) {
          const temp = quantity - this.savedCartProducts[i].quantity;
          for (let j = 0; j < temp; j++) {
            this.cartService.addProduct(this.savedCartProducts[i]);
          }
        }
        return this.cartService.getSavedProducts();
      }
    }

    return this.cartService.getSavedProducts();
  }
}

