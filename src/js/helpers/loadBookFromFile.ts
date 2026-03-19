import { Capacitor } from "@capacitor/core";
import type { FileInfo } from "@nikhilmwarrier/capacitor-directory-picker";
import { store } from "../store.svelte";
import getBookDoc from "./getBookDoc";
import getCover from "./getCover";

const getLastOpened = (filename: string) =>
  store.data.bookStates[filename]?.lastOpened || 0;

/**
 * Load a book into the store.
 * Accepts a book file (FileInfo type), generates cover, fetches lastOpened, and adds it to the store.
 * @param file The book file to load.
 */
export default async function loadBookFromFile(file: FileInfo) {
  const url = Capacitor.convertFileSrc(file.uri);
  const bookDoc = await getBookDoc(url);
  const bookCover = await getCover(bookDoc);
  const lastOpened = getLastOpened(file.name);

  console.log(file.name, store.bookFileNames);

  if (store.bookFileNames.includes(file.name)) {
    throw new Error("Book already exists in store.");
  }

  console.log("Adding book");
  store.data.bookFiles.unshift({
    coverSrc: bookCover,
    lastOpened,
    ...file,
  });
  console.log("Added book", file.name);
}
