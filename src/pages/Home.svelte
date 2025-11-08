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
    Button,
    f7,
    Fab,
    Icon,
  } from "framework7-svelte";
  import BookCard from "../components/BookCard.svelte";
  import Nav from "../components/Nav.svelte";
  import { FilePicker } from "@capawesome/capacitor-file-picker";
  import { Directory, Filesystem, type FileInfo } from "@capacitor/filesystem";
  import { onMount } from "svelte";

  import { makeBook } from "foliate-js/view.js";
  import { Capacitor } from "@capacitor/core";
  import type { BookDoc, BookFile } from "../types/view";

  const EBOOKS_DIR_NAME = "EmberEbooks";

  async function getEbooksDir() {
    // Try directory. If it fails, dir exists.
    try {
      await Filesystem.mkdir({
        path: EBOOKS_DIR_NAME,
        directory: Directory.Documents,
      });
    } catch (e) {
      // Directory exists.
    } finally {
      return Filesystem.stat({
        path: EBOOKS_DIR_NAME,
        directory: Directory.Documents,
      });
    }
  }

  let bookFiles = $state<BookFile[]>([]);
  let covers = $state<string[]>([]);

  async function getEbooks() {
    const dir = await getEbooksDir();
    const contents = await Filesystem.readdir({
      path: EBOOKS_DIR_NAME,
      directory: Directory.Documents,
    });
    return contents.files;
  }

  async function getCover(bookFile: FileInfo) {
    const url = Capacitor.convertFileSrc(bookFile.uri);
    const book: BookDoc = await makeBook(url);
    const coverBlob = await book.getCover();

    if (coverBlob) {
      const coverUrl = URL.createObjectURL(coverBlob);
      if (!coverUrl) return "";
      return coverUrl;
    }
    return "";
  }

  onMount(async () => {
    bookFiles = [];
    for (const bookFile of await getEbooks()) {
      const coverSrc = await getCover(bookFile);
      bookFiles.push({
        ...bookFile,
        coverSrc,
      });
    }
  });

  async function pickEpubs() {
    const result = await FilePicker.pickFiles({
      types: ["application/epub+zip"],
    });
    if (!result.files) return Promise.reject("Failed to pick files.");

    return Promise.resolve(result.files);
  }

  async function handleEpubSelector() {
    try {
      const files = await pickEpubs();

      for (const file of files) {
        console.log(file.path);
        if (!file.path) continue;
        Filesystem.copy({
          from: file.path,
          to: `${EBOOKS_DIR_NAME}/${file.name}`,
          toDirectory: Directory.Documents,
        });
      }

      const dirFiles = (
        await Filesystem.readdir({
          path: EBOOKS_DIR_NAME,
          directory: Directory.Documents,
        })
      ).files;

      for (const file of dirFiles) {
        console.log(file.name);
      }
    } catch (e) {
      console.error(e);
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
    <Link tabLink="#tab-2" text="Mail" iconIos="f7:" iconMd="material:email" />
  </Toolbar>

  <Fab position="right-bottom" on:click={handleEpubSelector} title="Add ebooks">
    <Icon ios="f7:add" md="material:add" />
  </Fab>

  <Tabs swipeable>
    <swiper-slide id="tab-1" class="tab tab-active page-content">
      <BlockTitle>Library</BlockTitle>

      <Block>
        <div class="grid grid-cols-2 grid-gap">
          {#each bookFiles as bookFile}
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
