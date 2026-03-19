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
    if (input.files && input.files.length > 0) {
      for (const uploadedFile of input.files) {
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

        try {
          await loadBookFromFile(file);
        } catch (error) {
          console.log("Error loading file: ", error);
        } finally {
          continue;
        }
      }
    }
  }

  async function handleChangeBooksDirectory(e: Event) {
    e.preventDefault();
    await resetBooksDirectory();
    await fetchBookFiles();
  }

  async function handleAddBooks() {
    switch (PLATFORM) {
      case "android":
        return importEbooks();
      case "web":
        document.querySelector<HTMLInputElement>("#file-input")!.click();
        break;
    }
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

  <Fab position="right-bottom" on:click={handleAddBooks} title="Add ebooks">
    <Icon ios="f7:add" md="material:add" />
  </Fab>

  <Tabs swipeable>
    <swiper-slide id="tab-1" class="tab tab-active page-content">
      <BlockTitle>Library</BlockTitle>

      <Block>
        {#if sortedBookFiles.length === 0}
          <p>Add some books to get started.</p>
        {:else}
          <div class="grid-gap grid grid-cols-2">
            {#each sortedBookFiles as bookFile}
              <BookCard {bookFile} />
            {/each}
          </div>
        {/if}
      </Block>
    </swiper-slide>
    <swiper-slide id="tab-2" class="tab page-content">
      {#if PLATFORM !== "web"}
        <BlockTitle>Settings</BlockTitle>
        <List strong inset>
          <ListItem
            link="#"
            title="Change books directory"
            on:click={handleChangeBooksDirectory}
          />
        </List>
      {/if}

      <BlockTitle>Download Books</BlockTitle>
      <List strong inset>
        <a href="https://standardebooks.org/" target="_blank" class="external">
          <ListItem title="Standard Ebooks">
            <Icon
              md="material:open_in_new"
              style="opacity: 0.3;"
              color="white"
              size={22}
            />
          </ListItem>
        </a>
        <a href="https://www.gutenberg.org/" target="_blank" class="external">
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

<!-- Hidden file input for web -->
{#if PLATFORM === "web"}
  <input
    type="file"
    id="file-input"
    style="display: none;"
    multiple
    onchange={(e) => loadBookFile(e)}
  />
{/if}

<style>
  .page-content {
    padding: 0;
  }
</style>
