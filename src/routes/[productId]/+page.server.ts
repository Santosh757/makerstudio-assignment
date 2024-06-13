import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
    const response = await fetch(`https://fakestoreapi.com/products/${params.productId}`)
    const product = await response.json()
    return { product }
};