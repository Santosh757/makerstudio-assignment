import { derived, get, writable } from "svelte/store";
import { persisted } from 'svelte-persisted-store'

export const products = writable<Product[]>([]);
export const categories = writable<Category[]>([]);
export const cartItems = persisted<CartItem[]>('cartItems', []);

export const currentPage = writable(0);
export const totalPages = writable<Product[][]>([]);
const itemsPerPage = 6;

export const paginate = (items: Product[]) => {
    const pages = Math.ceil(items.length / itemsPerPage);
    const paginatedItems = Array.from({ length: pages }, (_, index) => {
        const start = index * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    });
    totalPages.set(paginatedItems);
    currentPage.set(0);
};

export const currentPageRows = derived(
    [currentPage, totalPages],
    ([$currentPage, $totalPages]) => $totalPages[$currentPage] || []
);

export const setPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < get(totalPages).length) {
        currentPage.set(pageNumber)

    }
};

export const changeQuantity = (id: number, increment: boolean = true) => {
    cartItems.update((items: CartItem[]) =>
        items.map((item: CartItem) =>
            item.id === id
                ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
                : item
        )
    );
};
