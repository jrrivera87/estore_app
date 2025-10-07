import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ratings } from '../../../shared/components/ratings/ratings';

@Component({
  selector: 'app-cart',
  imports: [ AsyncPipe, FontAwesomeModule, CurrencyPipe, Ratings ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  faTrash = faTrash;

  constructor(public cartStore: CartStoreItem,
    private router: Router
  ) { }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem( cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

}
