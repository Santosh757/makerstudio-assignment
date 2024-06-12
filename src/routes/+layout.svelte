<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { categories, products } from "$lib/stores/product";
  import Navbar from "$lib/components/Navbar.svelte";

  export let data: LayoutData;

  $products = data.products;
  $categories = data.categories;
</script>

<div class="max-w-7xl mx-auto min-h-screen px-5">
  <Navbar />
  <slot />
</div>
