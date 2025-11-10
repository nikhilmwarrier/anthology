<script>
  import { Block, f7, Navbar, Page } from "framework7-svelte";
</script>

<Page>
  <Navbar transparent backLink="Back"></Navbar>
  <Block>
    <h1>Not Found</h1>
    <pre>
      {JSON.stringify(f7.views.main.router.currentRoute, null, 2)}
    </pre>
  </Block>
</Page>
