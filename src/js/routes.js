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
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
