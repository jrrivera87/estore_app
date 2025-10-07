import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ratings } from '../../../shared/components/ratings/ratings';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/product/products-service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-productdetails',
  imports: [Ratings, CurrencyPipe, FontAwesomeModule, AsyncPipe],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.scss'
})
export class Productdetails implements 
OnInit, 
OnDestroy {
  product: Product;
  subscriptions: Subscription = new Subscription;
  faShoppingCart = faShoppingCart;

  constructor(
    private activedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private cart: CartStoreItem
  ) {  }

  ngOnInit(): void {
    const id: number = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = product[0];
      })
    );
  }

  addToCart() {
    this.cart.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
