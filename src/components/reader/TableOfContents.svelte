<script lang="ts">
  import { StatusBar } from "@capacitor/status-bar";
  import {
    Block,
    f7,
    Link,
    Navbar,
    NavRight,
    Page,
    PageContent,
    Popup,
    Treeview,
  } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import { store } from "../../js/store.svelte";
  import TOCTree from "./TOCTree.svelte";
  import type { TOCNavigateEvent } from "../../types/types";
  import BasePopup from "../base/BasePopup.svelte";

  let { onNavigate }: { onNavigate: (e: TOCNavigateEvent) => void } = $props();

  let popup = $state<BasePopup>();

  function handleNavigate(e: TOCNavigateEvent) {
    f7.popup.close(".table-of-contents");
    onNavigate(e);
  }

  onMount(async () => await StatusBar.show());
  onDestroy(async () => await StatusBar.hide());
</script>

<BasePopup bind:this={popup} swipeToClose class="table-of-contents">
  <Navbar title="Table of Contents">
    <NavRight>
      <Link popupClose iconMd="material:close" />
    </NavRight>
  </Navbar>

  <Page>
    {#if store.currentBookDoc}
      <div class="space" style="padding: 1rem;"></div>
      <Treeview>
        <TOCTree
          offset={1}
          onNavigate={handleNavigate}
          tocItems={store.currentBookDoc.toc || []}
        />
      </Treeview>
    {/if}
  </Page>
</BasePopup>
