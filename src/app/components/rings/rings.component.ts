import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-rings',
  templateUrl: './rings.component.html',
  styleUrls: ['./rings.component.scss']
})
export class RingsComponent implements OnInit {
  productRings:any;
  constructor(private httpservice:ServiceService, private cartService :CartServiceService) { }

  ngOnInit(): void {
    this.getAllRings();
  }
  getAllRings(){
    this.httpservice.getRings().subscribe((data)=>{
      this.productRings=data;
      console.log(this.productRings);
    })
  }
  addToCart(product:any)
  {
    this.cartService.addProduct(product);
  }
}
