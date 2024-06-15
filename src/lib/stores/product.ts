import { writable } from "svelte/store";
import { persisted } from 'svelte-persisted-store'

export const products = writable<Product[]>([]);
export const categories = writable<Category[]>([]);
export const cartItems = persisted<CartItem[]>('cartItems', [])