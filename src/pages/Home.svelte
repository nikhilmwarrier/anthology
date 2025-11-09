<script lang="ts">
  import {
    Page,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Tabs,
    Fab,
    Icon,
  } from "framework7-svelte";
  import BookCard from "../components/BookCard.svelte";
  import Nav from "../components/Nav.svelte";
  import { onMount } from "svelte";

  import fetchBookFiles from "../js/helpers/fetchBookFiles";
  import { store } from "../js/store.svelte";
  import importEbooks from "../js/helpers/importEbooks";

  onMount(async () => {
    await fetchBookFiles();
  });
</script>

<Page name="home">
  <Nav />

  <Toolbar tabbar bottom icons>
    <Link
      tabLink="#tab-1"
      tabLinkActive
      text="Library"
      iconIos="f7:book"
      iconMd="material:library_books"
    />
    <Link tabLink="#tab-2" text="Mail" iconIos="f7:" iconMd="material:email" />
  </Toolbar>

  <Fab position="right-bottom" on:click={importEbooks} title="Add ebooks">
    <Icon ios="f7:add" md="material:add" />
  </Fab>

  <Tabs swipeable>
    <swiper-slide id="tab-1" class="tab tab-active page-content">
      <BlockTitle>Library</BlockTitle>

      <Block>
        <div class="grid grid-cols-2 grid-gap">
          {#each store.bookFiles as bookFile}
            <BookCard {bookFile} />
          {/each}
        </div>
      </Block>
    </swiper-slide>
    <swiper-slide id="tab-2" class="tab page-content">
      <List strong inset dividersIos>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
    </swiper-slide>
  </Tabs>
</Page>

<style>
  .page-content {
    padding: 0;
  }
</style>
