import { Injectable, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import swal from 'sweetalert';
import { Coupons, Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnInit {
  productList = new BehaviorSubject<any>([]);
  list = this.productList.asObservable();
  cartItem: Product[] = [];
  cartQuantity = new BehaviorSubject<number>(0);
  total = this.cartQuantity.asObservable();
  cartCount: any = 0;
  totalPrice = new BehaviorSubject<number>(0);
  myCartTotalPrice = this.totalPrice.asObservable()
  cartTotalPrice: any = 0;
  lastSavedData: any;


  constructor() {
  }


  ngOnInit(): void {

  }


  // getLocalStorageSavedProducts() {

  //   this.lastSavedData = localStorage.getItem('savedItems');
  //   this.cartCount = localStorage.getItem('cartQuantity');
  //   this.cartTotalPrice = localStorage.getItem('cartPrice');
  // }

  getSavedProducts() {
    this.list.subscribe((data) => {
      this.lastSavedData = data;
    });

    return this.lastSavedData;
  }

  getTotalCartPrice() {
    this.myCartTotalPrice.subscribe((data) => {
      this.cartTotalPrice = data;
    });

    return this.cartTotalPrice;
  }

  addProduct(item: Product) {

    for (let i = 0; i < this.cartItem.length; i++) {
      if (item.name === this.cartItem[i].name) {
        this.cartCount = this.cartCount + 1;
        this.cartItem[i].quantity = (this.cartItem[i].quantity + 1);
        this.cartItem[i].totalPrice = (this.cartItem[i].quantity * JSON.parse(this.cartItem[i].price));
        this.cartTotalPrice = this.cartTotalPrice + JSON.parse(this.cartItem[i].price);
        this.totalPrice.next(this.cartTotalPrice);
        this.cartQuantity.next(this.cartCount);
        this.productList.next(this.cartItem);
        localStorage.setItem('cartProducts', JSON.stringify(this.cartItem));

        return;
      }
    }
    item.quantity = 0;
    item.totalPrice = 0;
    item.quantity = item.quantity + 1;
    item.totalPrice = item.totalPrice + JSON.parse(item.price);
    this.cartTotalPrice = this.cartTotalPrice + JSON.parse(item.price);
    this.cartItem[this.cartItem.length] = item;
    this.cartCount = this.cartCount + 1;
    this.totalPrice.next(this.cartTotalPrice);
    this.cartQuantity.next(this.cartCount);
    this.productList.next(this.cartItem);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartItem));

    swal({
      icon: "success",
      text: "Added"
    });
    return;

  }

  removeProduct(itemName: any) {
    for (var i = 0; i < this.cartItem.length; i++) {
      if (itemName === this.cartItem[i].name) {
        if (this.cartItem[i].quantity === 1) {
          this.cartCount = (this.cartCount - 1);
          this.cartItem[i].quantity = 0;
          this.cartItem[i].totalPrice = (this.cartItem[i].totalPrice - JSON.parse(this.cartItem[i].price));
          this.cartTotalPrice = this.cartTotalPrice - JSON.parse(this.cartItem[i].price);
          this.totalPrice.next(this.cartTotalPrice);
          this.cartItem.splice(i, 1);
          this.cartQuantity.next(this.cartCount);
          this.productList.next(this.cartItem);
          localStorage.setItem('cartProducts', JSON.stringify(this.cartItem));


          swal({
            icon: "success",
            text: "deleted"
          });
          return;
        }
        this.cartCount = (this.cartCount - 1);
        this.cartItem[i].quantity = this.cartItem[i].quantity - 1;;
        this.cartItem[i].totalPrice = (this.cartItem[i].totalPrice - JSON.parse(this.cartItem[i].price));
        this.cartTotalPrice = this.cartTotalPrice - JSON.parse(this.cartItem[i].price);
        this.totalPrice.next(this.cartTotalPrice);
        this.cartQuantity.next(this.cartCount);
        this.productList.next(this.cartItem);
        localStorage.setItem('cartProducts', JSON.stringify(this.cartItem));
        let data = localStorage.getItem('cartProducts');
        console.log(data, "gettting the local storage data");


        swal({
          icon: "success",
          text: "deleted"
        });
        return;
      }
    }
    return;
  }

  clearCart() {
    localStorage.clear();
    return true;
  }
}
