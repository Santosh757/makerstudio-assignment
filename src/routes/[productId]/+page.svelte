<script lang="ts">
  import { page } from "$app/stores";
  import { cartItems } from "$lib/stores/product";

  let product: Product = $page.data.product;

  const addToCart = (id: number) => {
    const cartItem = $cartItems.find((item: CartItem) => item.id === id);
    if (cartItem) {
      $cartItems = $cartItems.map((item: CartItem) => {
        if (item.id === id) {
          item.quantity++;
        }
        return item;
      });
    } else {
      $cartItems = [...$cartItems, { id, quantity: 1 }];
    }
    console.log($cartItems);
  };
</script>

<div class="pt-20 pb-10 flex space-x-24">
  <section class="w-1/3">
    <img
      class="w-full h-full max-h-96 object-contain"
      src={product.image}
      alt="" />
  </section>
  <section class="flex-1">
    <h3 class="capitalize font-medium text-gray-500">{product.category}</h3>
    <h2 class="text-2xl font-semibold">{product.title}</h2>
    <p class="text-gray-700 mt-2">{product.description}</p>
    <p class="text-2xl font-semibold mt-3">₹{product.price}</p>
    <div class="flex items-center space-x-1 mt-2">
      <span class="font-semibold">Rating: {product.rating.rate}</span>
      <span class="text-sm text-gray-700">
        ({product.rating.count} ratings)
      </span>
    </div>
    <button
      on:click={() => addToCart(product.id)}
      class="mt-5 px-6 py-2.5 rounded-lg font-semibold bg-yellow-400">
      Add to cart
    </button>
  </section>
</div>
