<script lang="ts">
  import { Sheet } from "framework7-svelte";
  import { store } from "../../js/store.svelte";

  let props = $props();
  let sheetEventEl: HTMLDivElement;

  function sheetOpen(e: CustomEvent) {
    sheetEventEl = e.detail[0].el;
    if (sheetEventEl) store.data.openedSheets.push(sheetEventEl);
    console.log("Sheet: ", store.data.openedSheets.length);
  }

  function sheetClose(e: CustomEvent) {
    // Remove sheet from store
    const idx = store.data.openedSheets.indexOf(sheetEventEl);
    console.log(store.data.openedSheets);
    store.data.openedSheets.splice(idx, 1);
    console.log("Sheet: ", store.data.openedSheets.length);
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
