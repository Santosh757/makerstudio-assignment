<script lang="ts">
  import { cartItems, changeQuantity, products } from "$lib/stores/product";
  import { afterUpdate } from "svelte";
  import toast from "svelte-french-toast";

  let totalPrice: number = 0;

  const getProduct = (id: number) => {
    return $products.find((product) => product.id === id);
  };

  const getTotalPrice = () => {
    let price: number = 0;
    $cartItems.forEach((item: CartItem) => {
      const product: Product | undefined = getProduct(item.id);
      if (product) price += (product?.price ?? 0) * item.quantity;
    });
    totalPrice = price;
  };

  const deleteProductFromCart = (id: number) => {
    try {
      $cartItems = $cartItems.filter((item: CartItem) => item.id !== id);
      toast.success("Item successfully deleted from cart");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  afterUpdate(() => {
    getTotalPrice();
  });
</script>

<div class="pt-10 md:pt-20 pb-10">
  <div class="flex justify-between items-center">
    <h1 class="text-xl md:text-2xl lg:text-3xl font-semibold">Cart</h1>
    {#if $cartItems.length > 0}
      <p class="text-base md:text-xl">
        Subtotal: <span class="font-semibold">
          ₹{Number(totalPrice).toFixed(2)}
        </span>
      </p>
    {/if}
  </div>
  {#if $cartItems.length > 0}
    <div class="mt-5 space-y-5">
      {#each $cartItems as item}
        {@const product = getProduct(item.id)}
        <div
          class="p-4 md:p-5 border-[0.5px] rounded-lg shadow-md flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0">
          <img
            class="h-24 md:h-32 w-40 object-contain mx-auto md:mx-0"
            src={product?.image ?? ""}
            alt="" />
          <div>
            <h2 class="text-sm md:text-lg font-medium">
              {product?.title ?? ""}
            </h2>
            <p class="font-semibold mt-1 md:mt-2">
              ₹{product?.price ?? 0}
            </p>
            <div class="mt-3 md:mt-5 flex space-x-3">
              <div class="flex items-center space-x-2">
                <button
                  on:click={() => changeQuantity(item.id, true)}
                  class="p-1 border rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-4 md:size-5">
                    <path
                      d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                </button>
                <p>{item.quantity ?? 0}</p>
                <button
                  on:click={() => changeQuantity(item.id, false)}
                  disabled={!(item.quantity > 1)}
                  class="p-1 border rounded-md disabled:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-4 md:size-5">
                    <path
                      fill-rule="evenodd"
                      d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <button
                on:click={() => deleteProductFromCart(item.id)}
                class="px-4 py-1 rounded-md bg-red-100 text-red-500 text-sm md:text-base font-medium">
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
