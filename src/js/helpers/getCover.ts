import { Capacitor } from "@capacitor/core";
import type { BookDoc } from "../../types/types";

// @ts-ignore
import { makeBook } from "foliate-js/view.js";
import type { FileInfo } from "@nikhilmwarrier/capacitor-directory-picker";

// TODO: Implement fallback cover.

/**
 * Extract cover blob from book, and return url to it.
 * @param bookFile Book file
 * @returns `blob://` url for the book cover if it exists, else returns fallback cover.
 */
export default async function getCover(bookFile: FileInfo) {
  const url = Capacitor.convertFileSrc(bookFile.uri);
  const book: BookDoc = await makeBook(url);
  const coverBlob = await book.getCover();

  if (coverBlob) {
    const coverUrl = URL.createObjectURL(coverBlob);
    if (!coverUrl) return "";
    return coverUrl;
  }
  return "";
}
