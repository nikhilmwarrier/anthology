import type { FileInfo } from "@nikhilmwarrier/capacitor-directory-picker";
import getBookDoc from "./getBookDoc";
import { Capacitor } from "@capacitor/core";

// TODO: Implement fallback cover.

/**
 * Extract cover blob from book, and return url to it.
 * @param bookFile Book file
 * @returns `blob://` url for the book cover if it exists, else returns fallback cover.
 */
export default async function getCover(bookFile: FileInfo) {
  const url = Capacitor.convertFileSrc(bookFile.uri);
  const book = await getBookDoc(url);
  const coverBlob = await book.getCover();

  if (coverBlob) {
    const coverUrl = URL.createObjectURL(coverBlob);
    if (!coverUrl) return "";
    return coverUrl;
  }
  return "";
}
