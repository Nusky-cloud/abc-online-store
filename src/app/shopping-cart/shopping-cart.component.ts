import { Component, OnInit } from '@angular/core';
import { PriceEngineService } from '../_service/price-engine.service';
import { ResponseEnvelope } from '../_protocol/response-envelope';
import { ShoppingCartResponse } from '../_model/shopping-cart-response';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isLoadingCartDetails: boolean = false;
  shoppingCartResponse: ShoppingCartResponse = null;

  constructor(private priceEngineService: PriceEngineService) { }

  ngOnInit() {
    this.setCartdetails();
  }

  setCartdetails() {
    this.isLoadingCartDetails = true;
    this.priceEngineService.calculatePrice().subscribe((response: ResponseEnvelope) => {
      if (response && response.body && response.body.totalPrice) {
        this.shoppingCartResponse = response.body;
      }
      this.isLoadingCartDetails = false;
    }, error => {
      console.log("Error when retrieving cart details!");
      this.isLoadingCartDetails = false;
    });
  }

}
