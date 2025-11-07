<script>
  import { Link, Navbar, NavRight, Searchbar } from "framework7-svelte";
</script>

<Navbar title="Ember">
  <div class="navbar-inner">
    <NavRight>
      <Link
        searchbarEnable=".searchbar-demo"
        iconIos="f7:search"
        iconMd="material:search"
      />
      <!-- <Link iconIos="f7:gear" iconMd="material:more_vert" panelOpen="right" /> -->
    </NavRight>
    <Searchbar
      class="searchbar-demo"
      expandable
      searchContainer=".search-list"
      searchIn=".item-title"
    />
  </div>
</Navbar>
