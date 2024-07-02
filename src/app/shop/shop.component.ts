import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/shopping';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products$: Observable<Product[]> = this.shoppingService.getProducts();

  constructor(private shoppingService: ShoppingService) {}

  addToCart(product: Product): void {
    this.shoppingService.addProduct(product);
  }
}
