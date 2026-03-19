import { Capacitor } from "@capacitor/core";

export const SUPPORTED_FILETYPES = [
  // .epub
  "application/epub+zip",

  // .mobi
  "application/x-mobipocket-ebook",

  // .azw3
  "application/vnd.amazon.mobi8-ebook",
];

export const PLATFORM = Capacitor.getPlatform() as "ios" | "android" | "web";
