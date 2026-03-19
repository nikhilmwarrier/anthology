<script lang="ts">
  import { ScreenBrightness } from "@capacitor-community/screen-brightness";
  import { store } from "../../js/store.svelte";
  import { PLATFORM } from "../../js/constants";

  async function setScreenBrightness(value: number) {
    if (PLATFORM === "web") return;

    ScreenBrightness.setBrightness({
      brightness: value,
    }).catch(console.error);
  }

  let darkening = $derived.by(() =>
    store.settings.brightness !== null && store.settings.autoBrightness
      ? 0
      : -store.settings.brightness / 100,
  );

  $effect(() => {
    // Make sure brightness setting is tracked.
    if (store.settings.brightness === null) return;

    if (store.settings.autoBrightness) {
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
