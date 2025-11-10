<script>
  import { StatusBar } from "@capacitor/status-bar";
  import { Navbar, Page, PageContent, Popup } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import { store } from "../../js/store.svelte";

  onMount(async () => await StatusBar.show());
  onDestroy(async () => await StatusBar.hide());
</script>

<Popup class="table-of-contents" swipeToClose>
  <Page name="table-of-contents">
    <Navbar title="Table of Contents" backLink />
    <PageContent>
      {#if store.currentBookDoc}
        {#each store.currentBookDoc.toc as tocItem}
          <pre>{JSON.stringify(tocItem, null, 2)}</pre>
        {/each}
      {/if}
    </PageContent>
  </Page>
</Popup>
