import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-bracelets',
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.scss']
})
export class BraceletsComponent implements OnInit {
  productBracelets:any;

  constructor(private httpservice : ServiceService, private cartService : CartServiceService) { }

  ngOnInit(): void {
    this.getAllBracelets();
  }
  getAllBracelets()
  {
    this.httpservice.getBracelets().subscribe((data)=>{
      this.productBracelets=data;
      console.log(this.productBracelets);
    })
  }
  addToCart(product:any)
  {
    this.cartService.addProduct(product);
  }
}
