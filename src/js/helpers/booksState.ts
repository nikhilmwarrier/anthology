import { Preferences } from "@capacitor/preferences";
import type { BooksStateObject, BookState } from "../store.svelte";

const key = "booksState";

export async function loadBooksState(): Promise<BooksStateObject> {
  const fetched = await Preferences.get({
    key,
  });

  return JSON.parse(fetched.value ?? "[]");
}

export async function saveBooksState(state: BooksStateObject) {
  Preferences.set({
    key,
    value: JSON.stringify(state),
  });
}

export async function clearBooksState() {
  Preferences.remove({ key });
}
