import { CartItem } from './cartItem.model';
export interface Cart {
    id: string;
    cartItems: CartItem[];
}