<script>
  import { Icon } from "framework7-svelte";

  // @ts-nocheck

  let batteryPercentage = $state(100);
  if ("getBattery" in navigator) {
    navigator.getBattery().then(battery => {
      batteryPercentage = Math.round(battery.level * 100);

      battery.addEventListener("levelchange", () => {
        batteryPercentage = Math.round(battery.level * 100);
      });
    });
  }
</script>

<span>
  {batteryPercentage}%
</span>
