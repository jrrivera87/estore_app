import { Observable } from "rxjs";
import { StoreItem } from "../../../shared/storeItem";
import { Cart, CartItem } from "../../types/cart.type";
import { Product } from "../../types/products.type";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage/storage-service";
import { json } from "stream/consumers";

@Injectable ({
    providedIn: 'root',
})
export class CartStoreItem extends StoreItem<Cart> {
    constructor(private sessionStorageService: StorageService) {
        super(
            {
                products: [],
                totalAmount: 0,
                totalProducts: 0,
            })
        const storedCart: any = sessionStorageService.getItem('cart');
        if (storedCart) {
            this.setValue(JSON.parse(storedCart))
        } 
    }

    get cart$(): Observable<Cart> {
        return this.value$;
    }

    get cart(): Cart {
        return this.value;
    }

    addProduct(product: Product): void {
        const cartProduct: CartItem | undefined = this.cart.products.find(
            (cartProduct) => cartProduct.product.id === product.id
        );

        if (!cartProduct) {
            this.cart.products = [
                ...this.cart.products,
                {
                    product: product,
                    amount: Number(product.price),
                    quantity: 1,
                },
            ];
        } else {
            cartProduct.quantity ++;
            cartProduct.amount += Number(product.price);
        }
        this.cart.totalAmount += Number(product.price);
        ++this.cart.totalProducts;
        this.saveCart();
    }

    removeProduct(cartItem: CartItem):void {
        this.cart.products = this.cart.products.filter(
            (item) => item.product.id !== cartItem.product.id
        );
        this.cart.totalProducts -= cartItem.quantity;
        this.cart.totalAmount -= cartItem.amount;
        if(this.cart.totalProducts === 0) {
            this.sessionStorageService.removeItem('cart');
        } else {
            this.saveCart()
        }
    }

    decreaseProductQuantity(cartItem: CartItem): void {
        const cartProduct: CartItem | undefined = this.cart.products.find(
            (cartProduct) => cartProduct.product.id === cartItem.product.id
        );
        if(cartProduct) {
            if(cartProduct.quantity === 1) {
                this.removeProduct(cartItem);
            } else {
                cartProduct.quantity--;
                this.cart.totalAmount -= Number(cartItem.product.price);
                --this.cart.totalProducts;
                this.saveCart();
            }
        }
    }

    saveCart(): void {
       this.sessionStorageService.removeItem('cart');
       this.sessionStorageService.setItem('cart', JSON.stringify(this.cart));
    }

    clearCart(): void {
        this.sessionStorageService.removeItem('cart');
        this.cart.products = [];
        this.cart.totalAmount = 0;
        this.cart.totalProducts = 0;
    }
}