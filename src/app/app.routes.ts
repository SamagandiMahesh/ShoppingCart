import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';

const MAIN_PATH = '';
const SHOP_PATH = 'shop';
const CART_PATH = 'cart';

export const routes: Routes = [
  { path: MAIN_PATH, title: 'Main Home Page',component: MainComponent, pathMatch: 'full' },
  { path: SHOP_PATH, title: 'Shopping Page',component: ShopComponent },
  { path: CART_PATH, title: 'Cart Page',component: CartComponent },
];
