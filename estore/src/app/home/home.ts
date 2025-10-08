import { Component } from '@angular/core';
import { Catnavigation } from './components/catnavigation/catnavigation';
import { Header } from './components/header/header';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { SearchKeyword } from './types/searchKeyword.type';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ Header, Catnavigation, RouterOutlet ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem, 
    private productsStoreItem: ProductsStoreItem,
    private router: Router) {
      this.categoriesStoreItem.loadCategories();
      this.productsStoreItem.loadProducts();
      router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(event => {
          if((event as NavigationEnd).url === '/home') {
            router.navigate(['/home/products']);
          }
        });
  }

  onSelectCategory(categoryId: number): void {
    this.productsStoreItem.loadProducts('maincategoryid=' + categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts('maincategoryid=' + searchKeyword.categoryId + 
      '&keyword=' + searchKeyword.keyword);
  }

}
