import { SvelteMap, SvelteSet } from "svelte/reactivity";
import {
  type BookDoc,
  type BookFile,
  type BookLocationDetail,
  type CFIString,
} from "../types/types";
import DefaultMap from "./lib/DefaultMap";
import { loadBooksState, saveBooksState } from "./helpers/booksState";

export type ReaderSettings = {
  invertImages: boolean;
  justify: boolean;
  hyphenate: boolean;
  spacing: number;
  fontSize: number;
};

export interface Book extends BookDoc {
  cover: string;
}

export type BookState = {
  settings: ReaderSettings;
  lastOpened: EpochTimeStamp;
  lastLocation: CFIString | null;
};

export type BooksStateObject = { [bookPath: string]: BookState };

const defaultReaderSettings: ReaderSettings = {
  invertImages: true,
  justify: true,
  hyphenate: true,
  spacing: 16,
  fontSize: 16,
};

export const defaultBookState: BookState = {
  settings: defaultReaderSettings,
  lastOpened: 0,
  lastLocation: null,
};

class GlobalState {
  currentBookPath = $state("/book.epub");
  bookStates = $state<BooksStateObject>({});
  bookFiles = $state<BookFile[]>([]);
  currentBookDoc = $state<BookDoc>();
  currentBookPos = $derived(
    this.bookStates[this.currentBookPath]?.lastLocation || ""
  );

  constructor() {
    loadBooksState().then(state => {
      console.log("Loaded state: ", state);
      this.bookStates = state;
    });
  }

  settings = $derived(this.bookStates[this.currentBookPath]?.settings);

  // settings = $state<ReaderSettings>({
  //   invertImages: true,
  //   justify: true,
  //   hyphenate: true,
  //   spacing: 14,
  //   fontSize: 16,
  // });
}

export let store = new GlobalState();

$effect.root(() => {
  $inspect("Current: ", JSON.stringify(store.bookStates, null, 2));
  $effect(() => {
    saveBooksState(store.bookStates);
    console.log("State saved.");
  });
});
