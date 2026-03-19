import { DirectoryPicker } from "@nikhilmwarrier/capacitor-directory-picker";
import { PLATFORM, SUPPORTED_FILETYPES } from "../constants";
import { store } from "../store.svelte";
import { getBooksDirectory } from "./booksDirectory";
import loadBookFromFile from "./loadBookFromFile";

/**
 * Read books from bookdir and save them to `store.bookFiles[]`
 */
export default async function fetchBookFiles() {
  if (PLATFORM !== "android") return;

  // Reset store
  store.data.bookFiles = [];

  const dir = await getBooksDirectory();
  const files = (await DirectoryPicker.readFilesFromDirectory(dir)).files;

  for (const file of files) {
    if (!SUPPORTED_FILETYPES.includes(file.type)) continue;
    try {
      await loadBookFromFile(file);
    } catch (e) {
      console.info(`Cannot parse file "${file.name}":`, e, file);
      continue;
    }
  }
}
