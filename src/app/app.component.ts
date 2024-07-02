import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { ShoppingService } from './service/shopping.service';
import { Cart } from './model/shopping';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MainComponent,
    ShopComponent,
    CartComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cart$!: Observable<Cart>;
  constructor(private shoppingService: ShoppingService) {
    this.cart$ = this.shoppingService.cart$
  }
}
