<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { categories, products } from "$lib/stores/product";
  import Navbar from "$lib/components/Navbar.svelte";
  import { Toaster } from "svelte-french-toast";

  export let data: LayoutData;

  $products = data.products;
  $categories = data.categories;
</script>

<Toaster />
<div class="max-w-7xl mx-auto min-h-screen px-5">
  <Navbar />
  <slot />
</div>
