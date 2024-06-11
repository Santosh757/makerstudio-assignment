<script lang="ts">
  import { afterUpdate } from "svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { products } from "$lib/stores/product";
  import Navbar from "$lib/components/Navbar.svelte";

  export let data: LayoutData;

  afterUpdate(() => {
    $products = data.products;
    console.log($products);
  });
</script>

<div class="max-w-7xl mx-auto min-h-screen px-5">
  <Navbar />
  <slot />
</div>
