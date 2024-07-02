import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Cart, Product, ProductResponse, CartItem } from "../model/shopping";

@Injectable({
    providedIn: 'root',
})
export class ShoppingService {
    private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({
        items: [],
        totalAmount: 0,
        totalQuantity: 0
    });
    private readonly productsUrl = 'https://dummyjson.com/products?limit=50&select=id,title,price,images,discountPercentage,rating';

    cart$: Observable<Cart> = this.cartSubject.asObservable();

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<ProductResponse>(this.productsUrl)
            .pipe(
                map((response: ProductResponse) => response.products),
                catchError((err: any) => {
                    return throwError(() => new Error('Could not load products'));
                })
            );
    }

    private calculateTotalAmount(cart: Cart): number {
        return +cart.items.reduce((total: number, cartItem: CartItem) => total + cartItem.product.price * cartItem.quantity, 0).toFixed(2);
    }

    private calculateTotalQuantity(cart: Cart): number {
        return cart.items.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity, 0);
    }

    private updateCart(cart: Cart): void {
        cart.totalAmount = this.calculateTotalAmount(cart);
        cart.totalQuantity = this.calculateTotalQuantity(cart);
        this.cartSubject.next(cart);
    }

    addProduct(product: Product): void {
        const currentCart = this.cartSubject.getValue();
        const existingProduct = currentCart.items.find((item: CartItem) => item.product.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            currentCart.items.push({
                product: product,
                quantity: 1
            });
        }

        this.updateCart(currentCart);
    }

    removeProduct(product: Product): void {
        const currentCart = this.cartSubject.getValue();
        currentCart.items = currentCart.items.filter((item: CartItem) => item.product.id !== product.id);
        this.updateCart(currentCart);
    }

    updateProductQuantity(product: Product, quantity: number): void {
        const currentCart = this.cartSubject.getValue();
        const existingProduct = currentCart.items.find((item: CartItem) => item.product.id === product.id);

        if (existingProduct) {
            existingProduct.quantity = quantity;
        }

        this.updateCart(currentCart);
    }
}
