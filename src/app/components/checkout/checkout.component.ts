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
    console.log(this.savedCartProducts);

    this.total.subscribe((data) => {
      this.totalItem = data;
      console.log(this.totalItem, "total item in the checkout page");
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
      console.log(this.totalItemPrice, "total item price in the chekout page");
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


  applyDiscoutCoupons(code: any) {
    console.log(code.value);
    switch (code.value) {
      case 'EAR00010':

        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let a = this.savedCartProducts[i].name.search('Earrings');
          if (a < 0) {
            this.flag = true;
            console.log("different name");
            break;
          }
          console.log(a, "aaaaaaaaaaaaa");
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 10) / 100;
          console.log(this.totalDiscount, "ear00010");
          this.discountApplied = this.totalDiscount;
          // this.totalItemPrice = this.totalItemPrice-this.discountApplied;

          this.flag = false;
        }
        break;

      case 'NEC00020':
        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let product = this.savedCartProducts[i].name.search('Necklace');
          if (product < 0) {
            this.flag = true;
            break;
          }
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 20) / 100;
          console.log(this.totalDiscount, "ear00010");
          this.discountApplied = this.totalDiscount;
          // this.totalItemPrice = this.totalItemPrice-this.discountApplied;
          this.flag = false;
        }
        console.log(this.appliedCoupons, 'NEC00020');
        break;

      case 'RIN00015':
        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let product = this.savedCartProducts[i].name.search('Ring');
          if (product < 0) {
            this.flag = true;
            return false;
          }
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 15) / 100;
          console.log(this.totalDiscount, "Ring00010");
          this.discountApplied = this.totalDiscount;
          //  this.totalItemPrice = this.totalItemPrice-this.discountApplied;
          this.flag = false;
          return true;
        }
        console.log(this.appliedCoupons, 'RIN00015');
        break;
      case 'BRC00025':
        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let product = this.savedCartProducts[i].name.search('Bracelet');
          if (product < 0) {
            this.flag = true;
            return false;
          }
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 25) / 100;
          console.log(this.totalDiscount, "Brace00010");
          this.discountApplied = this.totalDiscount;
          //  this.totalItemPrice = this.totalItemPrice-this.discountApplied;
          this.flag = false;
          return true;
        }
        console.log(this.appliedCoupons, 'BRC00025');
        break;
      case 'BRCRIN20':
        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let product = this.savedCartProducts[i].name.search('Bracelet');
          let product2 = this.savedCartProducts[i].name.search('Ring');
          if (product < 0 && product2 < 0) {
            this.flag = true;
            return false;
          }
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 20) / 100;
          console.log(this.totalDiscount, "BRARIN00020");
          this.discountApplied = this.totalDiscount;
          // this.totalItemPrice = this.totalItemPrice-this.discountApplied;
          this.flag = false;
          return true;
        }
        console.log(this.appliedCoupons, 'BRCRIN20');
        break;
      case 'NECRIN25':
        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let product = this.savedCartProducts[i].name.search('Necklace');
          let product2 = this.savedCartProducts[i].name.search('Ring');
          if (product < 0 || product2 < 0) {
            this.flag = true;
            return false;
          }
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 25) / 100;
          console.log(this.totalDiscount, "NECRIN00020");
          this.discountApplied = this.totalDiscount;
          // this.totalItemPrice = this.totalItemPrice-this.discountApplied;
          this.flag = false;
          return true;
        }
        console.log(this.appliedCoupons, 'NECRIN25');
        break;
      case 'EARNEC20':
        for (let i = 0; i < this.savedCartProducts.length; i++) {
          let product = this.savedCartProducts[i].name.search('Necklace');
          let product2 = this.savedCartProducts[i].name.search('Earrings');
          if (product < 0 || product2 < 0) {
            this.flag = true;
            return false;
          }
        }
        if (!this.flag) {
          this.totalDiscount = (this.totalItemPrice * 20) / 100;
          console.log(this.totalDiscount, "NECEAR00020");
          this.discountApplied = this.totalDiscount;
          // this.totalItemPrice = this.totalItemPrice-this.discountApplied;
          this.flag = false;
          return true;
        }
        console.log(this.appliedCoupons, 'EARNEC20');
        break;
      case '':
        this.discountApplied=0;
        break;
      default:
        this.discountApplied=0;
        break;
    }
    this.flag = false;
    return;
  }


  manageQuantity(quantity: any, productName: any) {
    // console.log(quantity);
    // console.log(productName);
    for (let i = 0; i < this.savedCartProducts.length; i++) {
      if (this.savedCartProducts[i].name === productName) {
        if (this.savedCartProducts[i].quantity > quantity) {
          const temp = this.savedCartProducts[i].quantity-quantity;
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
