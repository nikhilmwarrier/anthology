<script>
  let {
    value = $bindable(0),
    title = "Stepper",
    min = 0,
    max = 10,
    step = 1,
  } = $props();
  import { ListItem, Stepper } from "framework7-svelte";
</script>

<ListItem>
  <span class="list-title">{title}</span>
  <Stepper
    autorepeat
    autorepeatDynamic
    roundMd
    {min}
    {max}
    {step}
    bind:value
    inputReadonly
    decimalPoint={1}
  />
</ListItem>
