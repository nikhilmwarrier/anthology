import type { BookDoc } from "../../types/types";

// TODO: Implement fallback cover.

/**
 * Extract cover blob from book, and return url to it.
 * @param bookFile Book file
 * @returns `blob://` url for the book cover if it exists, else returns fallback cover.
 */
export default async function getCover(bookDoc: BookDoc) {
  const coverBlob = await bookDoc.getCover();

  if (coverBlob) {
    const coverUrl = URL.createObjectURL(coverBlob);
    if (!coverUrl) return "";
    return coverUrl;
  }
  return "";
}
