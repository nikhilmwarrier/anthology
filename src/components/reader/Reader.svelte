<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { defaultBookState, store } from "../../js/store.svelte";
  import type {
    CFIString,
    FoliateView,
    PageItem,
    ReaderSettings,
    TOCItem,
  } from "../../types/types";
  import Overlay from "./Overlay.svelte";
  import getBookDoc from "../../js/helpers/getBookDoc";
  import { hideSystemBars, showSystemBars } from "../../js/helpers/systemBars";
  import type { ChangeEventHandler } from "svelte/elements";
  import { Capacitor } from "@capacitor/core";
  import getURLfromURI from "../../js/helpers/getURLfromURI";
  import { filterCSS, filterHTML } from "../../js/helpers/filterStyles";
  import setScreenBrightness from "../../js/helpers/setScreenBrightness";

  const getCSS = (settings: ReaderSettings) => `
    @namespace epub "http://www.idpf.org/2007/ops";


    @font-face {
        font-family: 'Cartisse';
        src: url('${window.location.origin}/Cartisse_v2.01/Cartisse-Regular.ttf') format('truetype');;
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
      font-family: "Cartisse";
      src: url('${window.location.origin}/Cartisse_v2.01/Cartisse-Italic.ttf') format('truetype');
      font-weight: normal;
      font-style: italic;
    }

    /* Bold */
    @font-face {
      font-family: "Cartisse";
      src: url('${window.location.origin}/Cartisse_v2.01/Cartisse-Bold.ttf') format('truetype');;
      font-weight: bold;
      font-style: normal;
    }

    /* Bold Italic */
    @font-face {
      font-family: "Cartisse";
      src: url('${window.location.origin}/Cartisse_v2.01/Cartisse-BoldItalic.ttf') format('truetype');;
      font-weight: bold;
      font-style: italic;
    }

    html, body {
        color-scheme: ${store.isDarkTheme ? "dark" : "light"};
        background: ${store.isDarkTheme ? "black" : "#f4ecd8"} !important;
        color: ${store.isDarkTheme ? "white" : "#5b4636"} !important;
        font-size: ${settings.fontSize}px;
        font-family: "Cartisse", serif;
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
        margin: auto 0 !important;
        line-height: ${settings.spacing / 10} !important;
        text-align: ${settings.justify ? "justify" : "start"} !important;
        color: ${store.isDarkTheme ? "white" : "#5b4636"} !important;
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

  onMount(async () => {
    // @ts-ignore
    await import("foliate-js/view.js");
    try {
      const bookFile = store.data.bookFiles.find(
        (file) => file.name === store.currentBookFilename,
      );
      const url = bookFile ? getURLfromURI(bookFile?.uri) : "";
      console.log("file, URL", bookFile?.name, url);
      await loadBook(url);
      hideSystemBars();
    } catch (e) {
      alert(e);
      console.error(e);
    }
  });

  onDestroy(async () => {
    view?.close();
    setScreenBrightness(-1);
    await showSystemBars();
  });

  async function loadBook(bookPath: string) {
    if (!view) return;

    try {
      console.log("Loading", bookPath);

      try {
        await view.open(bookPath);
      } catch (error) {
        console.error("Error loading book", bookPath, error);
      } finally {
        console.log("Loaded book", bookPath);
      }

      store.data.currentBookDoc = await getBookDoc(bookPath);

      store.initializeCurrentBook();

      store.currentBookState.lastOpened = Date.now();
      console.log("Last opened: ", store.currentBookState.lastOpened);

      view.book?.transformTarget?.addEventListener("data", (e: any) => {
        const detail = e.detail;
        const { data, type, name } = detail;

        // We only care about CSS files or HTML with inline styles
        if (type === "text/css") {
          detail.data = filterCSS(data);
        } else if (type === "application/xhtml+xml" || type === "text/html") {
          detail.data = filterHTML(data);
        }
      });

      // view.renderer.setAttribute("margin", "0px"); // Remove unnecessary margins
      view.renderer.setAttribute("gap", "2ch");
      view.renderer.setStyles?.(styles);

      view.init({ lastLocation: store.currentBookState?.lastLocation || "" });
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

  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("fraction", e.currentTarget.value);
    try {
      const fraction = Number(e.currentTarget.value);
      console.log("fraction", fraction);
      currentProgress = fraction;
      view?.goToFraction(fraction);
    } catch (err) {
      console.error(err);
    }
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (!view) return;

    switch (e.key) {
      case "ArrowRight":
        view.goRight();
        break;
      case "ArrowLeft":
        view.goLeft();
        break;
      // Press 'r' to reload the app. Useful for debugging.
      case "r":
        window.location.reload();
        break;
      default:
        break;
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="wrapper">
  {#if view}
    <Overlay
      foliateView={view}
      bind:fraction={currentProgress}
      onFractionChange={handleProgressChange}
    />
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
