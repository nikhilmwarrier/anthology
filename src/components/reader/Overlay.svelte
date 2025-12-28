<script lang="ts">
  import { Button, Link, Range } from "framework7-svelte";
  import type { FoliateView } from "../../types/types";
  import TableOfContents from "./TableOfContents.svelte";
  import { onMount } from "svelte";
  import BrightnessControlOverlay from "./BrightnessControlOverlay.svelte";
  import { hideSystemBars } from "../../js/helpers/systemBars";
  import type { ChangeEventHandler } from "svelte/elements";

  let {
    foliateView: view,
    fraction = $bindable(0),
    onFractionChange,
  }: {
    foliateView: FoliateView;
    fraction: number;
    onFractionChange: ChangeEventHandler<HTMLInputElement>;
  } = $props();

  $effect(() => {
    console.log(fraction);
  });

  function turnPage(n: number) {
    if (!view) return;
    hideSystemBars();
    try {
      if (n === -1) view?.goLeft?.();
      else view?.goRight?.();
    } catch (e) {
      console.error(e);
    }
  }

  let bottomBarActive = $state(true);
  let showSeekbar = $state(false);
  let bottomBarOpacity = $derived(bottomBarActive ? 1 : 0.5);

  onMount(() => {
    bottomBarActive = false;
  });

  function handleSeekbarToggle() {
    if (showSeekbar) showSeekbar = false;
    else {
      showSeekbar = true;
      setTimeout(() => (showSeekbar = false), 1500);
    }
  }

  function handleTOCNavigate(e: { href: string }) {
    view.goTo(e.href);
  }

  async function goToNextSection() {
    if (!view) return;
    try {
      await view.renderer.nextSection?.();
    } catch (e) {
      console.error("Failed to go to next chapter:", e);
    }
  }

  async function goToPrevSection() {
    if (!view) return;
    try {
      await view.renderer.prevSection?.();
    } catch (e) {
      console.error("Failed to go to next chapter:", e);
    }
  }
</script>

<div id="overlay">
  <BrightnessControlOverlay />

  <div class="top"></div>
  <button class="btn-prev-page" onclick={() => turnPage(-1)}>
    Previous Page
  </button>
  <button class="btn-next-page" onclick={() => turnPage(+1)}>
    Next Page
  </button>
  <div class="bottom" style:--opacity={bottomBarOpacity}>
    <div
      class="seekbar"
      style:--visibility={showSeekbar ? "visible" : "hidden"}
    >
      <input
        aria-label="Seek to fraction"
        type="range"
        min={0}
        max={1}
        step={0.0000001}
        bind:value={fraction}
        oninput={onFractionChange}
        list="seekbar-ticks"
      />
      <datalist id="seekbar-ticks">
        {#each view.getSectionFractions() as fraction}
          <option value={fraction.toFixed(2)}></option>
        {/each}
      </datalist>
    </div>

    <Button back iconMd="material:arrow_back" iconIos="f7:back" tooltip="Back"
    ></Button>
    <div class="bottom-mid">
      <Button
        iconMd="material:first_page"
        title="Previous Section"
        on:click={() => goToPrevSection()}
      />
      <Button
        iconMd="material:toc"
        title="Table of Contents"
        tooltipTrigger="hover"
        popupOpen=".table-of-contents"
      />
      <Button
        iconMd="material:last_page"
        title="Next Section"
        on:click={() => goToNextSection()}
      />
    </div>
    <div class="bottom-right">
      <Button tooltip="Seek" on:click={handleSeekbarToggle}>
        <span>{Math.floor(fraction * 100)}%</span>
      </Button>
      <Link
        iconMd="material:more_vert"
        iconIos="f7:gear"
        tooltip="Settings"
        sheetOpen=".reader-settings"
      />
    </div>
  </div>
</div>
<TableOfContents onNavigate={handleTOCNavigate} />

<style>
  :global(#overlay) {
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
    --opacity: 1;
    pointer-events: all;
    grid-area: bottom;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: var(--opacity);
    transition: all 0.2s ease-out;
    &:hover {
      opacity: 1;
    }
    /* background: green; */
  }

  .seekbar {
    --visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 1rem;
    width: calc(100% - 1rem);
    z-index: 5;
    background: var(--f7-md-surface);
    padding: 1rem;
    border-radius: 999px;
    left: 0.5rem;
    bottom: 4rem;
    visibility: var(--visibility);
    &:hover {
      visibility: visible;
    }

    input {
      width: 100%;
      accent-color: var(--f7-md-primary);
    }
  }

  .bottom-right,
  .bottom-mid {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
</style>
