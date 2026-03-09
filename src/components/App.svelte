<script lang="ts">
  import "../css/app.css";
  import { App as CapacitorApp } from "@capacitor/app";
  import { f7ready, App, View } from "framework7-svelte";
  import routes from "../js/routes";
  import { onMount } from "svelte";
  import type { Framework7Parameters } from "framework7/types";
  import SettingsPanel from "./settings/SettingsPanel.svelte";
  import { store } from "../js/store.svelte";

  // Framework7 Parameters
  let f7params: Framework7Parameters = {
    name: "Anthology", // App name
    theme: "md",
    darkMode: "auto",
    routes,
    touch: {
      tapHold: true,
    },
  };

  onMount(async () => {
    store.load();
  });

  onMount(() => {
    f7ready((f7) => {
      CapacitorApp.addListener("backButton", () => {
        // If there are sheets, close the newest popup instead of navigating.
        if (store.data.openedSheets.length > 0) {
          f7.sheet.close(store.data.openedSheets.at(-1));
          console.log("Popups");
          return;
        }

        // If there are popups, close the newest popup instead of navigating.
        if (store.data.openedPopups.length > 0) {
          f7.popup.close(store.data.openedPopups.at(-1));
          console.log("Sheets");
          return;
        }

        const router = f7.views.current.router;

        if (router.history.length > 1) {
          router.back();
        } else {
          CapacitorApp.minimizeApp();
        }
      });
    });
  });
</script>

<App {...f7params}>
  <SettingsPanel />
  <View main class="safe-areas" url="/" />
</App>
