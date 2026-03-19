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
    f7,
  } from "framework7-svelte";
  import BookCard from "../components/BookCard.svelte";
  import Nav from "../components/Nav.svelte";
  import { onMount } from "svelte";

  import fetchBookFiles from "../js/helpers/fetchBookFiles";
  import { store } from "../js/store.svelte";
  import importEbooks from "../js/helpers/importEbooks";
  import { resetBooksDirectory } from "../js/helpers/booksDirectory";
  import { PLATFORM } from "../js/constants";
  import type { FileInfo } from "@nikhilmwarrier/capacitor-directory-picker";
  import loadBookFromFile from "../js/helpers/loadBookFromFile";

  onMount(async () => {
    await fetchBookFiles();
  });

  const sortedBookFiles = $derived(
    store.data.bookFiles.toSorted((a, b) => b.lastOpened - a.lastOpened),
  );

  type FileEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
  async function loadBookFile(e: FileEvent) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      const uploadedFile = input.files[0];

      console.log(uploadedFile);
      const bookDocURI = URL.createObjectURL(uploadedFile);

      // Prepare for loadBookFromFile()
      const file: FileInfo = {
        lastModified: Date.now(),
        uri: bookDocURI,
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
      };

      await loadBookFromFile(file);

      store.data.currentBookFilename = file.uri;
    }

    f7.view.current.router.navigate(`/reader`);
  }

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
        {#if PLATFORM === "web"}
          <Link href="/reader">Open default book</Link>
          <br />
          <input
            type="file"
            id="file-input"
            onchange={(e) => loadBookFile(e)}
          />
        {/if}

        <div class="grid-gap grid grid-cols-2">
          {#each sortedBookFiles as bookFile}
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
    </swiper-slide>
  </Tabs>
</Page>

<style>
  .page-content {
    padding: 0;
  }
</style>
