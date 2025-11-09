import { Preferences } from "@capacitor/preferences";
import { DirectoryPicker } from "@nikhilmwarrier/capacitor-directory-picker";
import type { BookDirectory } from "../../types/types";

const key = "booksDirectory";

/**
 * Get directory which holds books. Prompt user for a directory if not present.
 * @returns Object, with the `.uri` field holding the URI of the dir.
 */
export async function getBooksDirectory(): Promise<BookDirectory> {
  const fetched = await Preferences.get({
    key,
  });

  if (!fetched.value) {
    const picked = await DirectoryPicker.pickDirectory();
    await Preferences.set({
      key,
      value: JSON.stringify(picked),
    });
    return picked;
  }
  return JSON.parse(fetched.value);
}

export async function resetBooksDirectory(): Promise<BookDirectory> {
  await Preferences.remove({ key });
  return getBooksDirectory();
}
