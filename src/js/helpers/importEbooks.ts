import { Directory, Filesystem } from "@capacitor/filesystem";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { SUPPORTED_FILETYPES } from "../constants";
import getBooksDirectory from "./getBooksDirectory";

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
    const dir = getBooksDirectory();

    for (const file of files) {
      console.log(file.path);
      if (!file.path) continue;
      Filesystem.copy({
        from: file.path,
        to: `${dir}/${file.name}`,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
