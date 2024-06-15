<script lang="ts">
  import FilterAndSort from "$lib/components/FilterAndSort.svelte";
  import {
    currentPage,
    currentPageRows,
    paginate,
    products,
    setPage,
    totalPages,
  } from "$lib/stores/product";

  paginate($products);
</script>

<main class="mt-10 pb-10">
  <FilterAndSort />
  <div class="grid grid-cols-3 gap-8 mt-8">
    {#each $currentPageRows as product}
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
  <div class="mt-6 space-x-2">
    <button
      on:click={() => setPage($currentPage - 1)}
      class="px-2 py-0.5 border rounded-md">
      Prev
    </button>
    {#each $totalPages as _, i}
      <button
        on:click={() => setPage(i)}
        class="px-2 py-0.5 border rounded-md {$currentPage == i &&
          'bg-blue-500 text-white'}">{i + 1}</button>
    {/each}
    <button
      on:click={() => setPage($currentPage + 1)}
      class="px-2 py-0.5 border rounded-md">
      Next
    </button>
  </div>
</main>
