<script lang="ts">
  let { bookFile }: { bookFile: BookFile } = $props();
  import { f7 } from "framework7-svelte";
  import type { BookFile } from "../types/types";
  import { store } from "../js/store.svelte";
  import { Capacitor } from "@capacitor/core";

  const router = f7.views.main.router;

  function handleClick() {
    store.currentBookPath = Capacitor.convertFileSrc(bookFile.uri);
    f7.view.current.router.navigate(`/reader`);
  }
</script>

<div class="book-card">
  <button onclick={handleClick}>
    {#if bookFile.coverSrc === ""}
      <div class="text-cover">
        {bookFile.name}
      </div>
    {:else}
      <div>
        <img src={bookFile.coverSrc} alt="Cover" />
      </div>
    {/if}
  </button>
</div>

<style>
  button {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
  }
  .book-card {
    width: 100%;
    height: fit-content;
  }

  .text-cover {
    height: 100%;
    width: 100%;
    background: #cecece;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    border: 1px solid black;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
</style>
