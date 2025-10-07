import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../types/category.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-catnavigation',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './catnavigation.html',
  styleUrl: './catnavigation.scss'
})
export class Catnavigation {
  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>();

  displayOptions: boolean = true;

  constructor(public categoryStore: CategoriesStoreItem, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true : false;
    });
   }

  onCategoryClick(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
