<script lang="ts">
  import { cartItems } from "$lib/stores/product";

  let itemsCount: number;
  $: {
    itemsCount = $cartItems.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );
  }
</script>

<header class="flex items-center justify-between py-3 border-b">
  <a class="text-xl md:text-3xl font-bold" href="/"> Skshop </a>
  <a href="/cart" class="relative flex items-end space-x-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-shopping-cart h-6 w-6 md:h-8 md:w-8 text-gray-500">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path
        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
    <span class="text-sm md:text-base font-semibold">Cart</span>
    {#if itemsCount > 0}
      <div
        class="absolute left-1.5 -top-2 md:left-4 h-5 w-5 rounded-full bg-yellow-400 grid place-items-center">
        <p class="text-xs font-medium">
          {itemsCount > 9 ? "9+" : itemsCount}
        </p>
      </div>
    {/if}
  </a>
</header>
