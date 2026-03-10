import { Preferences } from "@capacitor/preferences";
import type { BooksStateObject } from "../../types/types";

const key = "booksState";

export async function loadBooksState(): Promise<BooksStateObject> {
  const fetched = await Preferences.get({
    key,
  });

  return JSON.parse(fetched.value ?? "{}");
}

export async function saveBooksState(state: BooksStateObject) {
  await Preferences.set({
    key,
    value: JSON.stringify(state),
  });
}

export async function clearBooksState() {
  await Preferences.remove({ key });
}
