<script lang="ts">
  import {
    f7,
    Link,
    Navbar,
    NavRight,
    Page,
    Treeview,
  } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import { store } from "../../js/store.svelte";
  import TOCTree from "./TOCTree.svelte";
  import type { TOCNavigateEvent } from "../../types/types";
  import BasePopup from "../base/BasePopup.svelte";
  import { hideSystemBars, showSystemBars } from "../../js/helpers/systemBars";

  let { onNavigate }: { onNavigate: (e: TOCNavigateEvent) => void } = $props();

  let popup = $state<BasePopup>();

  function handleNavigate(e: TOCNavigateEvent) {
    f7.popup.close(".table-of-contents");
    onNavigate(e);
  }
</script>

<BasePopup
  onPopupOpen={() => showSystemBars()}
  onPopupClose={() => hideSystemBars()}
  bind:this={popup}
  swipeToClose
  class="table-of-contents"
>
  <Navbar title="Table of Contents">
    <NavRight>
      <Link popupClose iconMd="material:close" />
    </NavRight>
  </Navbar>

  <Page>
    {#if store.data.currentBookDoc && store.data.currentBookDoc.toc && store.data.currentBookDoc.toc?.length > 0}
      <div class="space" style="padding: 1rem;"></div>
      <Treeview>
        <TOCTree
          offset={1}
          onNavigate={handleNavigate}
          tocItems={store.data.currentBookDoc.toc || []}
        />
      </Treeview>
    {:else}
      <div class="no-toc-found">
        <p>Table of Contents not found.</p>
      </div>
    {/if}
  </Page>
</BasePopup>

<style>
  .no-toc-found {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      opacity: 0.25;
      font-size: 1.5rem;
    }
  }
</style>
