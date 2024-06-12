import { writable } from "svelte/store";

export const products = writable<Product[]>([]);
export const categories = writable<Category[]>([]);