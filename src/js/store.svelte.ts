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
  currentBookFilename: string;
  bookStates: BooksStateObject;
  bookFiles: BookFile[];
  currentBookDoc: BookDoc | null;

  openedPopups: HTMLDivElement[];
  openedSheets: HTMLDivElement[];
};

class GlobalStore {
  // Svelte 5 allows $state directly on class fields
  isLoaded = $state(false);
  isDarkTheme = $state<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  data: globalState = $state({
    bookState: defaultBookState,
    currentBookFilename: "book.epub",
    bookStates: {} as BooksStateObject,
    bookFiles: [] as BookFile[],
    currentBookDoc: null,

    openedPopups: [] as HTMLDivElement[],
    openedSheets: [] as HTMLDivElement[],
  });

  constructor() {
    $effect.root(() => {
      $effect(() => {
        // force svelte to read every nested setting, making it deeply reactive
        // snapshot won't work here because svelte
        const stringifiedState = JSON.stringify(this.data.bookStates);

        // make sure this comes *after* the stringification. I spent an insane amount of time wondering why my $effect wasn't reactive. Turns out it was because of this.
        if (!this.isLoaded) return;

        // debounce
        const handler = setTimeout(() => {
          console.log("Saving books state!");

          const stateToSave = JSON.parse(stringifiedState);

          saveBooksState(stateToSave).catch((err) =>
            console.error("Capacitor save error", err),
          );
        }, 1000);

        return () => clearTimeout(handler);
      });
    });
  }

  resetStore() {
    this.data.bookStates = {};
  }

  initializeCurrentBook() {
    // Initialize the current book's state so Svelte binds to a reactive proxy,
    if (!this.data.bookStates[this.currentBookFilename]) {
      this.data.bookStates[this.currentBookFilename] = {
        settings: JSON.parse(JSON.stringify(defaultReaderSettings)),
        lastOpened: Date.now(),
        lastLocation: "",
      };
    }
  }

  // Aliases

  currentBookFilename = $derived(this.data.currentBookFilename);

  bookFileNames = $derived(this.data.bookFiles.map((b) => b.name));

  get settings() {
    if (this.currentBookState) {
      return this.currentBookState.settings;
    }
    return defaultReaderSettings;
  }

  get currentBookState() {
    return this.data.bookStates[this.currentBookFilename];
  }

  set currentBookState(value) {
    this.data.bookStates[this.currentBookFilename] = value;
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
      this.initializeCurrentBook();
      this.isLoaded = true;
    }
  }
}

export const store = new GlobalStore();
