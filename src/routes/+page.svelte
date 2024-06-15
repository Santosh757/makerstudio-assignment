<script lang="ts">
  import FilterAndSort from "$lib/components/FilterAndSort.svelte";
  import { products } from "$lib/stores/product";

  let currentPage: number = 0;
  let totalPages: Product[][] = [];
  let itemsPerPage: number = 6;

  $: currentPageRows = totalPages[currentPage] ?? [];

  const paginate = (items: Product[]) => {
    const pages = Math.ceil(items.length / itemsPerPage);

    totalPages = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return items.slice(start, start + itemsPerPage);
    });
    currentPageRows = totalPages[currentPage];
  };

  const setPage = (p: number) => {
    if (p >= 0 && p < totalPages.length) {
      currentPage = p;
    }
  };

  paginate($products);
</script>

<main class="mt-10 pb-10">
  <FilterAndSort />
  <div class="grid grid-cols-3 gap-8 mt-8">
    {#each currentPageRows as product}
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
      on:click={() => setPage(currentPage - 1)}
      class="px-2 py-0.5 border rounded-md">
      Prev
    </button>
    {#each totalPages as _, i}
      <button
        on:click={() => setPage(i)}
        class="px-2 py-0.5 border rounded-md {currentPage == i &&
          'bg-blue-500 text-white'}">{i + 1}</button>
    {/each}
    <button
      on:click={() => setPage(currentPage + 1)}
      class="px-2 py-0.5 border rounded-md">
      Next
    </button>
  </div>
</main>
