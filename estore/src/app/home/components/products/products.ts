import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { Ratings } from '../../../shared/components/ratings/ratings';
import { RouterLink } from '@angular/router';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/products.type';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, Ratings, AsyncPipe, RouterLink, FontAwesomeModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  faShoppingCart = faShoppingCart
  faSearch = faSearch

  constructor(public productsStore: ProductsStoreItem, 
    private cart: CartStoreItem) { };

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

}
