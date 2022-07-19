import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  productBracelets:any;
  productEarings:any;
  productNecklace:any;
  productRings:any;
  constructor(private httpservice : ServiceService,private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.getAllBracelets();
    this.getAllEarings();
    this.getAllNecklace();
    this.getAllRings();
  }
  getAllBracelets()
  {
    this.httpservice.getBracelets().subscribe((data)=>{
      this.productBracelets=data;
      console.log(this.productBracelets);
    })
  }
  
  getAllEarings(){
    this.httpservice.getEarings().subscribe((data)=>{
      this.productEarings=data;
      console.log(this.productEarings);
    })
  }
  getAllNecklace(){
    this.httpservice.getNecklaces().subscribe((data)=>{
      this.productNecklace=data;
      console.log(this.productNecklace);
    })
  }
  getAllRings(){
    this.httpservice.getRings().subscribe((data)=>{
      this.productRings=data;
      console.log(this.productRings);
    })
  }
  addToCart(product:any){
    this.cartService.addProduct(product);
  }
}
