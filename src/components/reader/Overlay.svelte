<script lang="ts">
  import { Button, Link, PageContent, Sheet } from "framework7-svelte";
  import type { FoliateView } from "../../types/view";
  import Settings from "../settings/Settings.svelte";
  import TimeIndicator from "./TimeIndicator.svelte";

  let { foliateView: view }: { foliateView: FoliateView } = $props();

  function turnPage(n: number) {
    if (!view) return;
    try {
      if (n === -1) view.goLeft();
      else view.goRight();
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div id="overlay">
  <div class="top"></div>
  <button class="btn-prev-page" onclick={() => turnPage(-1)}>
    Previous Page
  </button>
  <button class="btn-next-page" onclick={() => turnPage(+1)}>
    Next Page
  </button>
  <div class="bottom">
    <Button back iconMd="material:arrow_back" iconIos="f7:back"></Button>
    <div class="bottom-right">
      <TimeIndicator />

      <Link iconMd="material:more_vert" iconIos="f7:gear" href="settings" />
      <!-- sheetOpen=".demo-sheet" -->
    </div>
  </div>
</div>

<style>
  #overlay {
    --_gap: 7%;
    --_margin: 48px;
    --_max-inline-size: 720px;
    --_max-block-size: 1440px;
    --_max-column-count: 2;
    --_max-column-count-portrait: 1;
    --_max-column-count-spread: var(--_max-column-count);
    --_half-gap: calc(var(--_gap) / 2);
    --_max-width: calc(
      var(--_max-inline-size) * var(--_max-column-count-spread)
    );
    --_max-height: var(--_max-block-size);
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.5;
    z-index: 2;
    display: grid;
    pointer-events: none;
    grid-template-columns:
      minmax(var(--_gap), 1fr)
      minmax(0, calc(var(--_max-width) - var(--_gap)))
      minmax(var(--_gap), 1fr);
    grid-template-rows:
      minmax(var(--_margin), 1fr)
      minmax(0, var(--_max-height))
      minmax(var(--_margin), 1fr);

    grid-template-areas: "top top top" "left content right" "bottom bottom bottom";
    &.vertical {
      --_max-column-count-spread: var(--_max-column-count-portrait);
      --_max-width: var(--_max-block-size);
      --_max-height: calc(
        var(--_max-inline-size) * var(--_max-column-count-spread)
      );
    }
    @container (orientation: portrait) {
      & {
        --_max-column-count-spread: var(--_max-column-count-portrait);
      }
      &.vertical {
        --_max-column-count-spread: var(--_max-column-count);
      }
    }
  }

  .btn-prev-page {
    pointer-events: all;
    grid-area: left;
    opacity: 0;
  }

  .btn-next-page {
    pointer-events: all;
    grid-area: right;
    opacity: 0;
  }

  .top {
    padding: 2ch;
    pointer-events: all;
    grid-area: top;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0.5;
    /* background: yellow; */
  }

  .bottom {
    pointer-events: all;
    grid-area: bottom;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0.5;
    /* background: green; */
  }

  .bottom-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
