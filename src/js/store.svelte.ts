import {
  type BookDoc,
  type BookFile,
  type BooksStateObject,
  type BookState,
  type ReaderSettings,
} from "../types/types";
import { loadBooksState, saveBooksState } from "./helpers/booksState";

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

type globalState = {
  bookState: BookState;
  currentBookPath: string;
  bookStates: BooksStateObject;
  bookFiles: BookFile[];
  currentBookDoc: BookDoc | null;

  openedPopups: HTMLDivElement[];
  openedSheets: HTMLDivElement[];
};

class GlobalStore {
  // Svelte 5 allows $state directly on class fields
  isLoaded = $state(false);
  data: globalState = $state({
    bookState: defaultBookState,
    currentBookPath: "/book.epub",
    bookStates: {} as BooksStateObject,
    bookFiles: [] as BookFile[],
    currentBookDoc: null,

    openedPopups: [] as HTMLDivElement[],
    openedSheets: [] as HTMLDivElement[],
  });

  constructor() {
    $effect.root(() => {
      $effect(() => {
        if (!this.isLoaded) return;
        const stateToSave = $state.snapshot(this.data.bookStates);
        const timeoutId = setTimeout(() => {
          saveBooksState(stateToSave).catch((err) =>
            console.error("Capacitor save error", err),
          );
        }, 500);

        return () => clearTimeout(timeoutId);
      });
    });
  }

  resetStore() {
    this.data.bookStates = {};
  }

  // Aliases
  get settings() {
    if (this.currentBookState) {
      return this.currentBookState.settings;
    }
    return defaultReaderSettings;
  }

  get currentBookState() {
    return this.data.bookStates[this.data.currentBookPath];
  }

  set currentBookState(value) {
    this.data.bookStates[this.data.currentBookPath] = value;
  }

  async load() {
    try {
      const value = await loadBooksState();
      if (value) {
        // Reassigning updates the proxy, keeping deep reactivity intact
        this.data.bookStates = value;
      }
    } catch (e) {
      console.error("Failed to load state from Capacitor", e);
    } finally {
      this.isLoaded = true;
    }
  }
}

// Export a single instance to act as a singleton global store
export const store = new GlobalStore();
