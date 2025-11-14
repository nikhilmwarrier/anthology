<script>
  import { BlockTitle, f7, List, ListItem } from "framework7-svelte";
  import ToggleItem from "./ToggleItem.svelte";
  import { store } from "../../js/store.svelte";
  import StepperItem from "./StepperItem.svelte";
  import RangeItem from "./RangeItem.svelte";
</script>

<BlockTitle>Settings</BlockTitle>
{#if store.settings}
  <List>
    <ToggleItem
      title="Invert Images"
      bind:checked={store.settings.invertImages}
    />
    <ToggleItem title="Justify Text" bind:checked={store.settings.justify} />
    <ToggleItem title="Hyphenate" bind:checked={store.settings.hyphenate} />
    <StepperItem title="Spacing" max={50} bind:value={store.settings.spacing} />
    <StepperItem
      title="Font Size"
      max={50}
      bind:value={store.settings.fontSize}
    />
    <ToggleItem
      title="Auto Brightness"
      bind:checked={store.settings.autoBrightness}
    />
    {#if !store.settings.autoBrightness}
      <RangeItem
        title="Brightness"
        min={-100}
        max={100}
        step={5}
        bind:value={store.settings.brightness}
      />
    {/if}
  </List>
{/if}
