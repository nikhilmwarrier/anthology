<script lang="ts">
  import { TreeviewItem } from "framework7-svelte";
  import type { TOCItem, TOCNavigateEvent } from "../../types/types";
  import TOCTree from "./TOCTree.svelte";

  let {
    tocItems,

    // To set width of child elements
    offset = 0,
    onNavigate,
  }: {
    tocItems: TOCItem[];
    offset: number;
    onNavigate: (e: TOCNavigateEvent) => void;
  } = $props();

  function handleClick(href: string) {
    console.log("Clicked!", href, JSON.stringify(onNavigate));
    onNavigate({
      href,
    });
  }
</script>

{#each tocItems as item}
  {#if item.subitems}
    <TreeviewItem>
      <button
        onclick={() => handleClick(item.href)}
        slot="content-start"
        style:--offset={offset}
      >
        {item.label}
      </button>
      <TOCTree {onNavigate} tocItems={item.subitems} offset={offset + 1} />
    </TreeviewItem>
  {:else}
    <TreeviewItem>
      <button
        onclick={() => handleClick(item.href)}
        slot="content-start"
        style:--offset={offset}
      >
        {item.label}
      </button>
    </TreeviewItem>
  {/if}
{/each}

<style>
  button {
    all: unset;
    display: inline;
    background-color: transparent;
    font-size: 1rem;
    padding: 1rem 0.5rem;
    width: calc(
      100svw - var(--f7-treeview-item-padding-left) -
        var(--f7-treeview-item-padding-right) - var(--offset) *
        var(--f7-treeview-children-offset) - 16px
    );
  }
</style>
