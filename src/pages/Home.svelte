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
  import { resetBooksDirectory } from "../js/helpers/booksDirectory";

  onMount(async () => {
    await fetchBookFiles();
  });

  async function handleChangeBooksDirectory(e: Event) {
    e.preventDefault();
    await resetBooksDirectory();
    await fetchBookFiles();
  }
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
    <Link
      tabLink="#tab-2"
      text="Settings"
      iconIos="f7:"
      iconMd="material:settings"
    />
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
      <BlockTitle>Settings</BlockTitle>
      <List strong inset>
        <ListItem
          link="#"
          title="Change books directory"
          on:click={handleChangeBooksDirectory}
        />
      </List>

      <BlockTitle>Download Books</BlockTitle>
      <List strong inset>
        <a href="https://standardebooks.org/" class="external">
          <ListItem title="Standard Ebooks">
            <Icon
              md="material:open_in_new"
              style="opacity: 0.3;"
              color="white"
              size={22}
            />
          </ListItem>
        </a>
        <a href="https://www.gutenberg.org/" class="external">
          <ListItem title="Project Gutenberg">
            <Icon
              md="material:open_in_new"
              style="opacity: 0.3;"
              color="white"
              size={22}
            />
          </ListItem>
        </a>
      </List>

      <BlockTitle>About</BlockTitle>

      <List strong inset>
        <a href="https://github.com/nikhilmwarrier/anthology" class="external">
          <ListItem title="Source Code">
            <Icon
              md="material:open_in_new"
              style="opacity: 0.3;"
              color="white"
              size={22}
            />
          </ListItem>
        </a>
      </List>

      <Block>
        <p class="version">Version 1.0.1</p>
      </Block>
    </swiper-slide>
  </Tabs>
</Page>

<style>
  .page-content {
    padding: 0;
  }

  .version {
    text-align: right;
    opacity: 0.3;
  }
</style>
