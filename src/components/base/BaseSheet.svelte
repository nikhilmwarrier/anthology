<script lang="ts">
  import { Sheet } from "framework7-svelte";
  import { store } from "../../js/store.svelte";

  let props = $props();
  let sheetEventEl: HTMLDivElement;

  function sheetOpen(e: CustomEvent) {
    sheetEventEl = e.detail[0].el;
    if (sheetEventEl) store.openedSheets.push(sheetEventEl);
    console.log("Sheet: ", store.openedSheets.length);
  }

  function sheetClose(e: CustomEvent) {
    // Remove sheet from store
    const idx = store.openedSheets.indexOf(sheetEventEl);
    console.log(store.openedSheets);
    store.openedSheets.splice(idx, 1);
    console.log("Sheet: ", store.openedSheets.length);
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
