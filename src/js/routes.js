import TableOfContents from "../components/reader/TableOfContents.svelte";
import SettingsPanel from "../components/settings/SettingsPanel.svelte";
import Home from "../pages/Home.svelte";
import NotFoundPage from "../pages/NotFoundPage.svelte";
import ReaderPage from "../pages/ReaderPage.svelte";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/reader",
    component: ReaderPage,
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
