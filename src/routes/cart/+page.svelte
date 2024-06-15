<script lang="ts">
  import { cartItems, products } from "$lib/stores/product";
  import toast from "svelte-french-toast";

  const getProduct = (id: number) => {
    return $products.find((product) => product.id === id);
  };

  const getTotalPrice = () => {
    let totalPrice: number = 0;
    $cartItems.forEach((item: CartItem) => {
      const product: Product | undefined = getProduct(item.id);
      if (product) totalPrice += (product?.price ?? 0) * item.quantity;
    });
    return totalPrice;
  };

  const deleteProductFromCart = (id: number) => {
    try {
      $cartItems = $cartItems.filter((item: CartItem) => item.id !== id);
      toast.success("Item successfully deleted from cart");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
</script>

<div class="pt-20 pb-10">
  <div class="flex justify-between">
    <h1 class="text-3xl font-semibold">Cart</h1>
    {#if $cartItems.length > 0}
      <p class="text-xl">
        Subtotal: <span class="font-semibold">
          ₹{Number(getTotalPrice()).toFixed(2)}
        </span>
      </p>
    {/if}
  </div>
  {#if $cartItems.length > 0}
    <div class="mt-5 space-y-5">
      {#each $cartItems as item}
        {@const product = getProduct(item.id)}
        <div class="p-5 border-[0.5px] rounded-lg shadow-md flex space-x-10">
          <img
            class="h-32 w-40 object-contain"
            src={product?.image ?? ""}
            alt="" />
          <div>
            <h2 class="text-lg font-medium">{product?.title ?? ""}</h2>
            <p class="font-semibold mt-2">
              ₹{product?.price ?? 0}
            </p>
            <div class="mt-5 flex space-x-3">
              <button
                on:click={() => deleteProductFromCart(item.id)}
                class="px-4 py-1 rounded-md bg-red-100 text-red-500 font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="mt-1 font-medium text-gray-500 text-lg">
      You haven't added any product in the cart yet.
    </p>
  {/if}
</div>
