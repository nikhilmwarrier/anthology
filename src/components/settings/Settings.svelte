<script>
  import { BlockTitle, f7, List, ListItem } from "framework7-svelte";
  import ToggleItem from "./ToggleItem.svelte";
  import { store } from "../../js/store.svelte";
  import StepperItem from "./StepperItem.svelte";
</script>

<BlockTitle>Settings</BlockTitle>
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
</List>
