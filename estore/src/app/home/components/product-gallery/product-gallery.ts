import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { Products } from '../products/products';
import { Sidenavigation } from '../sidenavigation/sidenavigation';


@Component({
  selector: 'app-product-gallery',
  imports: [ Products, Sidenavigation ],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.scss'
})
export class ProductGallery {
  constructor(private productsStoreItem: ProductsStoreItem) {};

  onSelectSubCategory(subCategoryId: number):void {
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
}
