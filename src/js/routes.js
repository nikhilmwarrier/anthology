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
    path: "/read/:book/",
    component: ReaderPage,
  },
  {
    path: "/read/:book/settings",
    popup: {
      component: SettingsPanel,
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
