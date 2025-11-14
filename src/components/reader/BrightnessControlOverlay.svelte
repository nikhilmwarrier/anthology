<script>
  import { ScreenBrightness } from "@capacitor-community/screen-brightness";
  import { store } from "../../js/store.svelte";

  let darkening = $derived.by(() =>
    store.settings.brightness !== null && store.settings.autoBrightness
      ? 0
      : -store.settings.brightness / 100
  );

  $effect(() => {
    // Make sure brightness setting is tracked.
    if (store.settings.brightness === null) return;

    if (store.settings.autoBrightness) {
      ScreenBrightness.setBrightness({
        brightness: -1,
      }).catch(console.error);
    } else if (store.settings.brightness >= 0) {
      ScreenBrightness.setBrightness({
        brightness: store.settings.brightness / 100,
      }).catch(console.error);
    } else {
      ScreenBrightness.setBrightness({
        brightness: 0,
      }).catch(console.error);
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
