<script lang="ts">
  import { afterUpdate } from "svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { products } from "$lib/stores/product";

  export let data: LayoutData;

  afterUpdate(() => {
    $products = data.products;
    console.log($products);
  });
</script>

<slot />
