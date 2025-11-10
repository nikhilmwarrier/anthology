import type { BookDoc } from "../../types/types";
// @ts-ignore
import { makeBook } from "foliate-js/view.js";

export default async function getBookDoc(bookUri: string): Promise<BookDoc> {
  return makeBook(bookUri);
}
