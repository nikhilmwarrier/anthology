import type { BookDoc, BookFile, BookLocationDetail } from "../types/types";

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
  location: BookLocationDetail["location"];
};

class GlobalState {
  currentBookPath = $state("/book.epub");
  bookStates = $state(new Map<string, BookState>());
  bookFiles = $state<BookFile[]>([]);

  settings = $state<ReaderSettings>({
    invertImages: true,
    justify: true,
    hyphenate: true,
    spacing: 14,
    fontSize: 16,
  });
}

export let store = new GlobalState();

$effect.root(() => {
  $inspect("Current: ", store.currentBookPath);
});
