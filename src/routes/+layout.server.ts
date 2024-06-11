import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
    const response = await fetch('https://fakestoreapi.com/products?limit=6')
    const result = await response.json()
    // console.log(result)
    return { products: result }
};