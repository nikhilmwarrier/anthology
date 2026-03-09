<script lang="ts">
  import { Sheet } from "framework7-svelte";
  import { store } from "../../js/store.svelte";

  let props = $props();
  let sheetEventEl: HTMLDivElement;

  function sheetOpen(e: CustomEvent) {
    sheetEventEl = e.detail[0].el;
    if (sheetEventEl) store.data.openedSheets.push(sheetEventEl);
  }

  function sheetClose(e: CustomEvent) {
    // Remove sheet from store
    const idx = store.data.openedSheets.indexOf(sheetEventEl);
    store.data.openedSheets.splice(idx, 1);
  }
</script>

<Sheet
  class="table-of-contents"
  swipeToClose
  {...props}
  on:sheetOpen={sheetOpen}
  on:sheetClose={sheetClose}
>
  {@render props.children()}
</Sheet>
