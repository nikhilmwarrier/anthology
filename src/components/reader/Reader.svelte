<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    defaultBookState,
    store,
    type BookState,
    type ReaderSettings,
  } from "../../js/store.svelte";
  import type {
    CFIString,
    FoliateView,
    PageItem,
    TOCItem,
  } from "../../types/types";
  import { StatusBar } from "@capacitor/status-bar";
  import Overlay from "./Overlay.svelte";
  import getBookDoc from "../../js/helpers/getBookDoc";
  import { hideSystemBars, showSystemBars } from "../../js/helpers/systemBars";

  const getCSS = (settings: ReaderSettings) => `
    @namespace epub "http://www.idpf.org/2007/ops";
    html {
        color-scheme: dark light;
        background: black;
        font-size: ${settings.fontSize}px;
        font-family: serif;
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media (prefers-color-scheme: dark) {
        a:link {
            color: lightblue;
        }
    }

    ${
      settings.invertImages
        ? `img {
      filter: invert(1) hue-rotate(180deg);
    }`
        : ""
    }
      
    p, li, blockquote, dd {
        line-height: ${settings.spacing / 10} !important;
        text-align: ${settings.justify ? "justify" : "start"} !important;
        -webkit-hyphens: ${settings.hyphenate ? "auto" : "manual"};
        hyphens: ${settings.hyphenate ? "auto" : "manual"};
        -webkit-hyphenate-limit-before: 3;
        -webkit-hyphenate-limit-after: 2;
        -webkit-hyphenate-limit-lines: 2;
        hanging-punctuation: allow-end last;
        widows: 2;
    }
    /* prevent the above from overriding the align attribute */
    [align="left"] { text-align: left; }
    [align="right"] { text-align: right; }
    [align="center"] { text-align: center; }
    [align="justify"] { text-align: justify; }

    pre {
        white-space: pre-wrap !important;
    }
    aside[epub|type~="endnote"],
    aside[epub|type~="footnote"],
    aside[epub|type~="note"],
    aside[epub|type~="rearnote"] {
        display: none;
    }
`;

  let styles = $derived(getCSS(store.settings));

  let view = $state<FoliateView>();

  let currentTOCItem = $state<TOCItem | null>();
  let currentPageLabel = $state("");
  let currentProgress = $state(0);

  $effect(() => {
    if (currentProgress === null || !view) return;
    view.goToFraction(currentProgress);
  });

  onMount(async () => {
    // @ts-ignore
    await import("foliate-js/view.js");
    try {
      await loadBook(store.currentBookPath);
      hideSystemBars();
    } catch (e) {
      alert(e);
      console.error(e);
    }
  });

  onDestroy(async () => {
    await StatusBar.show();
    showSystemBars();
  });

  async function loadBook(bookPath: string) {
    if (!view) return;

    try {
      await view.open(bookPath);

      store.currentBookDoc = await getBookDoc(bookPath);

      // view.renderer.setAttribute("margin", "0px"); // Remove unnecessary margins
      view.renderer.setAttribute("gap", "2ch");
      view.renderer.setStyles?.(styles);

      view.init({ lastLocation: store.currentBookState.lastLocation });
    } catch (e) {
      console.error("Failed to load book:", e);
    }
  }

  $effect(() => {
    if (view) {
      const handleRelocate = (e: {
        detail: {
          tocItem: TOCItem | null;
          pageItem: PageItem | null;
          fraction: number | null;
          cfi: CFIString | null;
        };
      }) => {
        const { tocItem, pageItem, fraction } = e.detail;

        store.currentBookState.lastLocation = e.detail.cfi || "";

        currentTOCItem = tocItem;
        currentPageLabel = pageItem?.label || ""; // From EPUB page-list
        currentProgress = fraction || 0;
      };

      view.addEventListener("relocate", handleRelocate);

      return () => {
        view?.removeEventListener("relocate", handleRelocate);
      };
    }
  });

  $effect(() => {
    try {
      view?.renderer?.setStyles?.(styles);
      styles = styles;
    } catch (e) {
      console.error("Error setting styles:", e);
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (!view) return;

    switch (e.key) {
      case "ArrowRight":
        view.goRight();
        break;
      case "ArrowLeft":
        view.goLeft();
      default:
        break;
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="wrapper">
  {#if view}
    <Overlay foliateView={view} bind:fraction={currentProgress} />
  {/if}
  <foliate-view bind:this={view}> </foliate-view>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  /* Ensure the view element has a defined size */
  foliate-view {
    display: block;
    width: 100%;
    height: 100%;
    /* border: 1px solid #ccc; */
  }
</style>
