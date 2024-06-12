import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
    const response = await fetch('https://fakestoreapi.com/products')
    const result = await response.json()

    const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories')
    const categoriesResult = await categoriesResponse.json()
    return { products: result, categories: categoriesResult }
};

