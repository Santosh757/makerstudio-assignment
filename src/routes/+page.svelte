<script lang="ts">
  import FilterAndSort from "$lib/components/FilterAndSort.svelte";
  import { products } from "$lib/stores/product";
</script>

<main class="mt-10">
  <FilterAndSort />
  <div class="grid grid-cols-3 gap-8 mt-8">
    {#each $products as product}
      <a
        href={`/${product.id}`}
        class="p-4 rounded-lg shadow-md w-full overflow-hidden border-[0.5px]">
        <img
          class="w-full max-w-40 h-48 object-contain mx-auto"
          src={product.image}
          alt="" />
        <p class="mt-5 text-lg font-medium">{product.title}</p>
        <p class="mt-1 text-xl font-semibold">₹{product.price}</p>
      </a>
    {/each}
  </div>
</main>
