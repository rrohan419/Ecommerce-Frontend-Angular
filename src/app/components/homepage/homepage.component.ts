import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  productBracelets: any;
  productEarings: any;
  productNecklace: any;
  productRings: any;
  discountedPrice = 0;
  // displayBraceletsProducts:any=[];
  // displayEarrigsProducts=[];
  // displayNecklaceProducts=[];
  // displayRingsProducts=[];
  constructor(private httpservice: ServiceService, private cartService: CartServiceService) { }

  ngOnInit(): void {
    console.log(this.productBracelets);
    console.log(this.productEarings);
    console.log(this.productNecklace);
    console.log(this.productRings);
    // this.getAllBracelets();
    // this.getAllEarings();
    // this.getAllNecklace();
    // this.getAllRings();
  }

  // getAllBracelets() {
  //   this.httpservice.getBracelets().subscribe((data) => {
  //     this.productBracelets = data;
  //     this.discountedPrice = data.price - (data.price * data.discount) / 100;
  //     console.log(this.productBracelets);
  //     console.log(this.discountedPrice, "breacelet discouted price");
  //   });
  // }

  // getAllEarings() {
  //   this.httpservice.getEarings().subscribe((data) => {
  //     this.productEarings = data;
  //     console.log(this.productEarings);
  //   })
  // }

  // getAllNecklace() {
  //   this.httpservice.getNecklaces().subscribe((data) => {
  //     this.productNecklace = data;
  //     console.log(this.productNecklace);
  //   })
  // }

  // getAllRings() {
  //   this.httpservice.getRings().subscribe((data) => {
  //     this.productRings = data;
  //     console.log(this.productRings);
  //   })
  // }

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
