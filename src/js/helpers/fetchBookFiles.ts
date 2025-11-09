import { DirectoryPicker } from "@nikhilmwarrier/capacitor-directory-picker";
import getBooksDirectory from "./getBooksDirectory";
import { SUPPORTED_FILETYPES } from "../constants";
import getCover from "./getCover";
import { store } from "../store.svelte";

/**
 * Read books from bookdir and save them to `store.bookFiles[]`
 */
export default async function fetchBookFiles() {
  const dir = await getBooksDirectory();
  const files = (await DirectoryPicker.readFilesFromDirectory(dir)).files;

  for (const file of files) {
    if (!SUPPORTED_FILETYPES.includes(file.type)) continue;
    try {
      const coverSrc = await getCover(file);
      store.bookFiles.push({
        ...file,
        coverSrc,
      });
    } catch (e) {
      console.info(`Cannot parse file "${file.name}":`, e, file);
      continue;
    }
  }
}
