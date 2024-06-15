<script lang="ts">
  import { categories, paginate, products } from "$lib/stores/product";

  let selectedCategory: Category;
  let selectedSortOption: string;

  const filterProducts = async () => {
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      $products = result;
      paginate($products);
    }
  };

  const sortProducts = () => {
    if (selectedSortOption === "price-asc") {
      $products = $products.sort((a: Product, b: Product) => a.price - b.price);
      paginate($products);
    } else if (selectedSortOption === "price-desc") {
      $products = $products.sort((a: Product, b: Product) => b.price - a.price);
      paginate($products);
    } else return;
  };
</script>

<div class="flex space-x-10">
  <label class="flex items-center space-x-2" for="filter">
    <span>Filter by category :</span>
    <div class="px-2 py-1 border rounded-md">
      <select
        id="filter"
        bind:value={selectedCategory}
        on:change={filterProducts}
        class="bg-transparent outline-none rounded-md capitalize">
        <option value="">Select Category</option>
        {#each $categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
  </label>
  <label class="flex items-center space-x-2" for="sort">
    <span>Sort by :</span>
    <div class="px-2 py-1 border rounded-md">
      <select
        id="sort"
        bind:value={selectedSortOption}
        on:change={sortProducts}
        class="bg-transparent outline-none rounded-md capitalize">
        <option value="">Select sort option</option>
        <option value="price-asc">Price low to high</option>
        <option value="price-desc">Price high to low</option>
      </select>
    </div>
  </label>
</div>
