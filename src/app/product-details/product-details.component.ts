import { Component, OnInit } from '@angular/core';
import { PriceEngineService } from '../_service/price-engine.service';
import { ResponseEnvelope } from '../_protocol/response-envelope';
import { Product } from '../_model/product';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ShoppingCartRequest } from '../_model/shopping-cart-request';
import { ProductQuantityType } from '../_enum/product-quantity-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productList: Product[] = [];
  isLoadingProducts: boolean = false;
  productFormGroup: FormGroup;
  isZeroQuantities: boolean = false;

  constructor(private priceEngineService: PriceEngineService, 
              private formBuilder: FormBuilder,
              private router: Router) { 

  }

  ngOnInit() {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    this.isLoadingProducts = true;
    this.priceEngineService.getAllProducts().subscribe((response: ResponseEnvelope) => {
      if (response && response.body && response.body.length > 0) {
        this.productList = response.body;
        this.initForm();
      }
      this.isLoadingProducts = false;
    }, error => {
      console.log("Error when retrieving all products!");
      this.isLoadingProducts = false;
    });
  }

  initForm() {
    this.productFormGroup = this.formBuilder.group({
      productFormArray: this.formBuilder.array([])
    });

    for (let product of this.productList) {
      this.productFormArray.push(
        this.formBuilder.group({
          productId: new FormControl(product.productId),
          unitQuantity: new FormControl(0),
          cartonQuantity: new FormControl(0)
        })
      );
    }
  }

  get productFormArray(): FormArray {
    return this.productFormGroup.get('productFormArray') as FormArray;
  }

  proceedToCart() {
    this.isZeroQuantities = false;
    let shoppingCartRequest: ShoppingCartRequest[] = [];

    for (let product of this.productFormArray.value) {
      let quantitiesByType: any = {};
      if (product.unitQuantity && product.unitQuantity > 0) {
        quantitiesByType[ProductQuantityType.UNIT] = product.unitQuantity;
      }

      if (product.cartonQuantity && product.cartonQuantity > 0) {
        quantitiesByType[ProductQuantityType.CARTON] = product.cartonQuantity;
      }

      if (quantitiesByType[ProductQuantityType.UNIT] || quantitiesByType[ProductQuantityType.CARTON]) {
        shoppingCartRequest.push({ 
          productId: product.productId,
          quantitiesByType: quantitiesByType
        });
      }
    }

    if (shoppingCartRequest.length == 0) {
      this.isZeroQuantities = true;
      return;
    }

    this.priceEngineService.shoppingCartRequest = shoppingCartRequest;
    this.router.navigate(['/cart']);
  }

}
