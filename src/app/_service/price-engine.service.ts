import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ShoppingCartRequest } from '../_model/shopping-cart-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceEngineService {

  shoppingCartRequest: ShoppingCartRequest[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllProducts() {
    return this.httpClient.get(environment.SERVICE.PRICE_ENGINE.GET_ALL_PRODUCTS);
  }

  calculatePrice() {
    return new Observable(obs => {
      this.httpClient.post(environment.SERVICE.PRICE_ENGINE.CALCULATE_PRICE, this.shoppingCartRequest).subscribe(response => {
        this.shoppingCartRequest = [];
        obs.next(response);
        obs.complete();
      }, error => {
        this.shoppingCartRequest = [];
        obs.error(error);
        obs.complete();
      });
    });
  }
}
