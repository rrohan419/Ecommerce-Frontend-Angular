import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Product } from 'src/app/service/product';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-necklace',
  templateUrl: './necklace.component.html',
  styleUrls: ['./necklace.component.scss']
})
export class NecklaceComponent implements OnInit {
  @Input()productNecklace: any;
  lastSavedCartProducts: any = localStorage.getItem('savedItems');

  productId!: number;
  constructor(private httpservice: ServiceService, private route: ActivatedRoute, private cartService: CartServiceService) { }

  ngOnInit(): void {

    this.getAllNecklace();
  }
  getAllNecklace() {
    this.httpservice.getNecklaces().subscribe((data) => {
      this.productNecklace = data;
      // this.productNecklace.quantity = 0;
      console.log(this.productNecklace);
    })
  }

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
