import { FilePicker } from "@capawesome/capacitor-file-picker";
import { SUPPORTED_FILETYPES } from "../constants";
import { getBooksDirectory } from "./booksDirectory";
import { DirectoryPicker } from "@nikhilmwarrier/capacitor-directory-picker";
import fetchBookFiles from "./fetchBookFiles";

async function pickEbookFiles() {
  const result = await FilePicker.pickFiles({
    types: SUPPORTED_FILETYPES,
  });
  if (!result.files) return Promise.reject("Failed to pick files.");

  return Promise.resolve(result.files);
}

/**
 * Prompt user to select books, and copy them to bookdir
 */
export default async function importEbooks() {
  try {
    const files = await pickEbookFiles();
    const dir = await getBooksDirectory();

    console.log("Selected files: ", files);
    console.log("Target dir: ", dir);

    for (const file of files) {
      if (!file.path) continue;
      await DirectoryPicker.copy({
        from: file.path,
        to: dir.uri,
      });
      console.log(`Book "${file.name}" copied.`);
    }

    // Update ebooks list after copying
    await fetchBookFiles();
  } catch (e) {
    console.error(e);
  }
}
