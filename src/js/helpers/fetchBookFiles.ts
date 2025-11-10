import { DirectoryPicker } from "@nikhilmwarrier/capacitor-directory-picker";
import { SUPPORTED_FILETYPES } from "../constants";
import getCover from "./getCover";
import { store } from "../store.svelte";
import { getBooksDirectory } from "./booksDirectory";

const getLastOpened = (filepath: string) =>
  store.bookStates[filepath]?.lastOpened || Date.now();

/**
 * Read books from bookdir and save them to `store.bookFiles[]`
 */
export default async function fetchBookFiles() {
  // Reset store
  store.bookFiles = [];

  const dir = await getBooksDirectory();
  const files = (await DirectoryPicker.readFilesFromDirectory(dir)).files;

  for (const file of files) {
    if (!SUPPORTED_FILETYPES.includes(file.type)) continue;
    try {
      const coverSrc = await getCover(file);
      const lastOpened = getLastOpened(file.uri);

      store.bookFiles.unshift({
        ...file,
        coverSrc,
        lastOpened,
      });
    } catch (e) {
      console.info(`Cannot parse file "${file.name}":`, e, file);
      continue;
    }
  }
}
