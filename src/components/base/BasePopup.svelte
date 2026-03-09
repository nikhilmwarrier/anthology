<script lang="ts">
  import { Popup } from "framework7-svelte";
  import { store } from "../../js/store.svelte";

  let props = $props();
  let popupEventEl: HTMLDivElement;

  function popupOpen(e: CustomEvent) {
    popupEventEl = e.detail[0].el;
    if (popupEventEl) store.data.openedPopups.push(popupEventEl);
  }

  function popupClose(e: CustomEvent) {
    // Remove popup from store
    const idx = store.data.openedPopups.indexOf(popupEventEl);
    console.log(store.data.openedPopups);
    store.data.openedPopups.splice(idx, 1);
  }
</script>

<Popup {...props} on:popupOpen={popupOpen} on:popupClose={popupClose}>
  {@render props.children()}
</Popup>
