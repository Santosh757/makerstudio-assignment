<script lang="ts">
  import { cartItems, products } from "$lib/stores/product";

  const getProduct = (item: CartItem) => {
    return $products.find((product) => product.id === item.id);
  };

  const getTotalPrice = () => {
    let totalPrice: number = 0;
    $cartItems.forEach((item: CartItem) => {
      const product: Product | undefined = getProduct(item);
      if (product) totalPrice += (product?.price ?? 0) * item.quantity;
    });
    return totalPrice;
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
        {@const product = getProduct(item)}
        <div class="p-5 border-[0.5px] rounded-lg shadow-md flex space-x-10">
          <img
            class="h-32 w-40 object-contain"
            src={product?.image ?? ""}
            alt="" />
          <div>
            <h2 class="text-lg font-medium">{product?.title ?? ""}</h2>
            <p class="font-semibold">
              ₹{(product?.price ?? 0) * item.quantity}
            </p>
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
