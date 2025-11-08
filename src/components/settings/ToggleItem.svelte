<script>
  import { Toggle } from "framework7-svelte";

  let { title = "Toggle", checked = $bindable(false) } = $props();
</script>

<li>
  <label class="item-content">
    <div class="item-inner">
      <div class="item-title">{title}</div>
      <div class="item-after">
        <label class="toggle toggle-init">
          <input type="checkbox" bind:checked />
          <span class="toggle-icon"></span>
        </label>
      </div>
    </div>
  </label>
</li>
