import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Product } from 'src/app/service/product';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productid!: number;
  url: any;
  productExtendedDetails!: Product;
  quantity: any = 0;
  // originalPrice : number = 0;
  discountedPrice: number = 0;
  constructor(private cartservice: CartServiceService, private httpservice: ServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productid = this.route.snapshot.params['id'];

    // console.log(this.productid, "id");
    this.url = this.route.snapshot.routeConfig;

    this.getProductDetail(this.url.path);

    // this.cartservice.cartQuantity.subscribe((data)=>{
    //     this.quantity = data;
    //     console.log(data,"product detail component tSotal");
    // })

  }
  getProductDetail(recievedUrl: any) {
    if (recievedUrl === "productdetailearring/:id") {
      this.httpservice.getEaringById(this.productid).subscribe((data) => {
        this.productExtendedDetails = data;
        this.productExtendedDetails.quantity = 0;

        this.discountedPrice = JSON.parse(this.productExtendedDetails.price) - ((JSON.parse(this.productExtendedDetails.price)) * (JSON.parse(this.productExtendedDetails.discount)) / 100);
        // this.originalPrice = parseInt( this.productExtendedDetails.price);
        // console.log(this.originalPrice);
        // console.log(this.productExtendedDetails);
      });
    }
    if (recievedUrl === "productdetailnecklace/:id") {
      this.httpservice.getNecklaceById(this.productid).subscribe((data) => {
        this.productExtendedDetails = data;
        this.productExtendedDetails.quantity = 0;

        this.discountedPrice = JSON.parse(this.productExtendedDetails.price) - ((JSON.parse(this.productExtendedDetails.price)) * (JSON.parse(this.productExtendedDetails.discount)) / 100);
        // console.log(this.productExtendedDetails);
      });
    }
    if (recievedUrl === "productdetailring/:id") {
      this.httpservice.getRingById(this.productid).subscribe((data) => {
        this.productExtendedDetails = data;
        this.productExtendedDetails.quantity = 0;

        this.discountedPrice = JSON.parse(this.productExtendedDetails.price) - ((JSON.parse(this.productExtendedDetails.price)) * (JSON.parse(this.productExtendedDetails.discount)) / 100);
        // console.log(this.productExtendedDetails);
      });
    }
    if (recievedUrl === "productdetailbracelet/:id") {
      this.httpservice.getBraceletById(this.productid).subscribe((data) => {
        this.productExtendedDetails = data;
        this.productExtendedDetails.quantity = 0;

        this.discountedPrice = JSON.parse(this.productExtendedDetails.price) - ((JSON.parse(this.productExtendedDetails.price)) * (JSON.parse(this.productExtendedDetails.discount)) / 100);
        // console.log(this.productExtendedDetails);
      });
    }
  }

  addToCart() {
    // this.productExtendedDetails.quantity = this.productExtendedDetails.quantity+1;
    this.cartservice.addProduct(this.productExtendedDetails);
    this.quantity = this.cartservice.cartCount;

    console.log(this.quantity, "count");
  }
}
