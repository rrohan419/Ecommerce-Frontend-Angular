import { Component, OnInit } from '@angular/core';
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
  discountApplied:any=0;
  appliedCoupons:any='';
  currentProductName:string='';
  list = this.cartService.productList.asObservable();
  total = this.cartService.cartQuantity.asObservable();
  myCartTotalPrice = this.cartService.totalPrice.asObservable();

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.list.subscribe((data) =>{
      this.savedCartProducts=data;
    });
    console.log(this.savedCartProducts);
    // this.cartService.productList.subscribe((data) => {
    //   this.savedCartProducts = JSON.stringify(data);
    // });


    // this.savedCartProducts =localStorage.getItem('savedItems');
    // console.log(this.savedCartProducts,"aaaaaa")/;
    this.total.subscribe((data) => {
      this.totalItem = data;
      console.log(this.totalItem,"total item in the checkout page");
    });

    this.myCartTotalPrice.subscribe((data) => {
      this.totalItemPrice = data;
      console.log(this.totalItemPrice,"total item price in the chekout page");
    });
  }

  removeProduct(productName: any) {

    // if (this.savedCartProducts.length == 1) {
    //   this.savedCartProducts[0].splice(0, 1);
    //   this.totalItem = 0;
    //   this.totalItemPrice = 0;
    //   this.savedCartProducts=[];
    //   this.cartService.cartQuantity.next(this.totalItem);
    //   this.cartService.totalPrice.next(this.totalItemPrice);
    //   this.cartService.productList.next(this.savedCartProducts);
    //   return;
    // }
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
  applyDiscoutCoupons()
  {
    console.log(this.appliedCoupons,"applied coupons");
    console.log(this.savedCartProducts,"saved cart product");
    for(let i=0;i<this.savedCartProducts.length;i++)
    {
      if(this.appliedCoupons==='EAR00010')
      {
        this.currentProductName = this.savedCartProducts[i].name;
        var index = this.currentProductName.search('Earrings');
        if(index !== -1 && this.totalItemPrice>5000)
        {
            this.discountApplied = (this.totalItemPrice*10)/100;
            this.totalItemPrice = this.totalItemPrice-this.discountApplied;
            this.cartService.totalPrice.next(this.totalItemPrice);
            return this.cartService.getTotalCartPrice();
        }  
        else{
          return this.cartService.getTotalCartPrice();
        }      
      }
    }
    return;
  }
}
