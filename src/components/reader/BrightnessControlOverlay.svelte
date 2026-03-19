<script lang="ts">
  import setScreenBrightness from "../../js/helpers/setScreenBrightness";
  import { store } from "../../js/store.svelte";

  let darkening = $derived.by(() =>
    store.settings.brightness !== null && store.settings.autoBrightness
      ? 0
      : -store.settings.brightness / 100,
  );

  $effect(() => {
    // Make sure brightness setting is tracked.
    if (store.settings.brightness === null) return;

    if (store.settings.autoBrightness) {
      setScreenBrightness(-1);
    } else if (store.settings.brightness >= 0) {
      setScreenBrightness(store.settings.brightness / 100);
    } else {
      setScreenBrightness(0);
    }
  });
</script>

<!-- Dim screen below 100% -->
<div class="darken-layer" style:--darkening={darkening}></div>

<style>
  .darken-layer {
    --darkening: 0;
    position: fixed;
    inset: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    background: black;
    opacity: var(--darkening);
    z-index: 3;
  }
</style>
