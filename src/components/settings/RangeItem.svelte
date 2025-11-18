<script>
  let {
    value = $bindable(0),
    title = "Stepper",
    min = 0,
    max = 10,
    step = 1,
  } = $props();
  import { ListItem, Range } from "framework7-svelte";
</script>

<ListItem>
  <Range {min} {max} {step} label={true} bind:value />
</ListItem>
