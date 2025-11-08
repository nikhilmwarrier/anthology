<script>
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
  } from "framework7-svelte";
  import BookCard from "../components/BookCard.svelte";
  import Nav from "../components/Nav.svelte";
  import { FilePicker } from "@capawesome/capacitor-file-picker";
  import { store } from "../js/store.svelte";
  import { Capacitor } from "@capacitor/core";
  import { Directory, Filesystem } from "@capacitor/filesystem";

  const pickFiles = async () => {
    const result = await FilePicker.pickFiles({
      limit: 1,
      types: ["application/epub+zip"],
    });
    if (result.files[0].path) {
      store.currentBookPath = Capacitor.convertFileSrc(result.files[0].path);
      f7.view.current.router.navigate("/reader/");
    }
  };

  async function pickDirectory() {
    const result = await FilePicker.pickDirectory();
    if (!result.path) return;
    console.log(result.path);

    const readResult = await Filesystem.readdir({
      path: result.path,
    });

    console.log("Files: ", readResult.files);
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

  <Tabs swipeable>
    <swiper-slide id="tab-1" class="tab tab-active page-content">
      <BlockTitle>Library</BlockTitle>

      <Block>
        <Button fill on:click={pickDirectory}>Open Folder</Button>
      </Block>
      <Block>
        <div class="grid grid-cols-2 grid-gap">
          <BookCard />
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
