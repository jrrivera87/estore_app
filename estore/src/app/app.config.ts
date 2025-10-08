import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CategoryService } from './home/services/category/category-service';
import { ProductsService } from './home/services/product/products-service';
import { CartStoreItem } from './home/services/cart/cart.storeItem';
import { UserService } from './home/components/users/services/user-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    CategoryService,
    ProductsService,
    CartStoreItem,
    UserService
  ]
};
