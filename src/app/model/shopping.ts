export type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Cart = {
  items: CartItem[]
  totalAmount: number;
  totalQuantity: number;
}

export type CartItem = {
  product: Product;
  quantity: number;
}