import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ShoppingService } from '../service/shopping.service';
import { Cart, Product } from '../model/shopping';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$!: Observable<Cart>;

  constructor(private shoppingService: ShoppingService) {
    this.cart$ = this.shoppingService.cart$;
  }

  removeFromCart(product: Product): void {
    this.shoppingService.removeProduct(product);
  }

  updateQuantity(product: Product, quantity: number): void {
    this.shoppingService.updateProductQuantity(product, quantity);
  }
}
