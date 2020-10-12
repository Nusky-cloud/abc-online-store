import { ShoppingCartDetail } from './shopping-cart-detail';

export class ShoppingCartResponse {
    pricesByProduct: ShoppingCartDetail[];
	totalPrice: number;
}
