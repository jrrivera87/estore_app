import { Component } from '@angular/core';
import { Catnavigation } from './components/catnavigation/catnavigation';
import { Header } from './components/header/header';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { SearchKeyword } from './types/searchKeyword.type';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ Header, Catnavigation, RouterOutlet ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private categoriesStoreItem: CategoriesStoreItem, private productsStoreItem: ProductsStoreItem) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }

  onSelectCategory(categoryId: number): void {
    this.productsStoreItem.loadProducts('maincategoryid=' + categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts('maincategoryid=' + searchKeyword.categoryId + 
      '&keyword=' + searchKeyword.keyword);
  }

}
