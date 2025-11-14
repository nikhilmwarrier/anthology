import { type BookDoc, type BookFile, type CFIString } from "../types/types";
import { loadBooksState, saveBooksState } from "./helpers/booksState";

export type ReaderSettings = {
  invertImages: boolean;
  justify: boolean;
  hyphenate: boolean;
  spacing: number;
  fontSize: number;
  autoBrightness: boolean;
  brightness: number;
};

export interface Book extends BookDoc {
  cover: string;
}

export type BookState = {
  settings: ReaderSettings;
  lastOpened: EpochTimeStamp;
  lastLocation: CFIString;
};

export type BooksStateObject = { [bookPath: string]: BookState };

const defaultReaderSettings: ReaderSettings = {
  invertImages: true,
  justify: true,
  hyphenate: true,
  spacing: 16,
  fontSize: 16,
  autoBrightness: true,
  brightness: 1,
};

export const defaultBookState: BookState = {
  settings: defaultReaderSettings,
  lastOpened: 0,
  lastLocation: "",
};

class GlobalState {
  currentBookPath = $state("/book.epub");

  bookStates = $state<BooksStateObject>({});
  bookFiles = $state<BookFile[]>([]);
  currentBookDoc = $state<BookDoc>();

  openedPopups = $state<HTMLDivElement[]>([]);
  openedSheets = $state<HTMLDivElement[]>([]);

  // Creates object in bookStates if not exists
  currentBookState = $derived.by(() => {
    if (!this.bookStates[this.currentBookPath])
      this.bookStates[this.currentBookPath] = defaultBookState;
    return this.bookStates[this.currentBookPath];
  });
  currentBookPos = $derived(this.currentBookState.lastLocation || "");

  constructor() {
    loadBooksState().then((state) => {
      console.log("Loaded state: ", state);
      this.bookStates = state;
    });
  }

  settings = $derived(this.currentBookState.settings);
}

export let store = new GlobalState();

$effect.root(() => {
  $effect(() => {
    saveBooksState(store.bookStates);
  });
});
