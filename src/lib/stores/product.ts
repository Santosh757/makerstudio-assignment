import { writable } from "svelte/store";
import { persisted } from 'svelte-persisted-store'

export const products = writable<Product[]>([]);
export const categories = writable<Category[]>([]);
export const cartItems = persisted<CartItem[]>('cartItems', []);

export const changeQuantity = (id: number, increment: boolean = true) => {
    cartItems.update((items: CartItem[]) =>
        items.map((item: CartItem) =>
            item.id === id
                ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
                : item
        )
    );
};
