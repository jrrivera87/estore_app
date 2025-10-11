import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { Home } from './home/home';
import { Component } from '@angular/core';
import { ProductGallery } from './home/components/product-gallery/product-gallery';
import { Productdetails } from './home/components/productdetails/productdetails';
import { Cart } from './home/components/cart/cart';
import { UserSignup } from './home/components/users/user-signup/user-signup';
import { UserLogin } from './home/components/users/user-login/user-login';
import { Pastorders } from './home/components/pastorders/pastorders';
import { authGuard } from './home/services/authguard';

export const routes: Routes = [
    { 
        path: 'home',
        loadComponent: () => import('./home/home').then(c => c.Home),
        children: [
            {
                path: 'products',
                component: ProductGallery,
            },
            {
                path: 'product/:id',
                component: Productdetails,
            },
            {
                path: 'cart',
                component: Cart,
            },
            {
                path: 'signup',
                component: UserSignup
            },
            {
                path: 'login',
                component: UserLogin
            },
            {
                path: 'pastorders',
                component: Pastorders,
                canActivate: [authGuard]
            }
        ]
    },
    { path: '', redirectTo: '/home/products', pathMatch: 'full' },
    { path: '**', component: NotFound}
];
