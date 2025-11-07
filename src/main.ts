// app.js

// Import F7 Bundle
import Framework7 from "framework7/lite-bundle";

// Import F7-Svelte Plugin
import Framework7Svelte from "framework7-svelte";

// Init F7-Svelte Plugin
Framework7.use(Framework7Svelte);

// Import Main App component
import App from "./components/App.svelte";
import { mount } from "svelte";

// Mount Svelte App
const app = mount(App, {
  target: document.getElementById("app") as HTMLElement,
});

export default app;
