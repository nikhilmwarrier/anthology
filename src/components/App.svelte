<script lang="ts">
  import { getDevice } from "framework7/lite-bundle";
  import "../css/app.css";
  import { App as CapacitorApp } from "@capacitor/app";
  import Settings from "../components/settings/Settings.svelte";

  import { f7ready, App, Panel, View, Page } from "framework7-svelte";

  import routes from "../js/routes";
  import { onMount } from "svelte";
  import type { Framework7Parameters } from "framework7/types";
  import SettingsPanel from "./settings/SettingsPanel.svelte";

  const device = getDevice();

  // Framework7 Parameters
  let f7params: Framework7Parameters = {
    name: "Ember", // App name
    theme: "auto", // Automatic theme detection
    routes,
  };

  onMount(() => {
    f7ready(f7 => {
      CapacitorApp.addListener("backButton", () => {
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

<App {...f7params} dark>
  <SettingsPanel />
  <View main class="safe-areas" url="/" />
</App>
