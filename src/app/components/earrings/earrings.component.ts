import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-earrings',
  templateUrl: './earrings.component.html',
  styleUrls: ['./earrings.component.scss']
})
export class EarringsComponent implements OnInit {
  productEarings : any;
  

  constructor(private httpservice: ServiceService, private cartService: CartServiceService) { 
  }

  ngOnInit(): void {
    this.getAllEaringsDetails();
  }

  getAllEaringsDetails()
  {
    this.httpservice.getEarings().subscribe((data) =>{
      this.productEarings = data;
      console.warn(this.productEarings);
    });
  }

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
