<script lang="ts">
  import { TreeviewItem } from "framework7-svelte";
  import type { TOCItem, TOCNavigateEvent } from "../../types/types";
  import TOCTree from "./TOCTree.svelte";

  let {
    tocItems,
    onNavigate,
  }: { tocItems: TOCItem[]; onNavigate: (e: TOCNavigateEvent) => void } =
    $props();

  function handleClick(href: string) {
    console.log("Clicked!", href, JSON.stringify(onNavigate));
    onNavigate({
      href,
    });
  }
</script>

{#each tocItems as item}
  {#if item.subitems}
    <TreeviewItem
      opened
      label={item.label}
      on:click={() => handleClick(item.href)}
    >
      <TOCTree {onNavigate} tocItems={item.subitems} />
    </TreeviewItem>
  {:else}
    <TreeviewItem label={item.label} on:click={() => handleClick(item.href)} />
  {/if}
{/each}
