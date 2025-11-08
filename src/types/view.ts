// Adapted from https://github.com/readest/readest

import type { FileInfo } from "@capacitor/filesystem";

export interface BookFile extends FileInfo {
  coverSrc: string;
}

export interface BookDoc {
  metadata: BookMetadata;
  rendition?: {
    layout?: "pre-paginated" | "reflowable";
    spread?: "auto" | "none";
    viewport?: { width: number; height: number };
  };
  dir: string;
  toc?: Array<TOCItem>;
  sections?: Array<SectionItem>;
  transformTarget?: EventTarget;
  splitTOCHref(href: string): Array<string | number>;
  getCover(): Promise<Blob | null>;
}

export type BookMetadata = {
  title: string;
  author: string;
  language: string | string[];
  editor?: string;
  publisher?: string;
  published?: string;
  description?: string;
  subject?: string | string[];
  identifier?: string;
  altIdentifier?: string | string[];

  subtitle?: string;
  series?: string;
  seriesIndex?: number;
  seriesTotal?: number;

  coverImageFile?: string;
  coverImageUrl?: string;
  coverImageBlobUrl?: string;
};

export type Location = {
  current: number;
  next: number;
  total: number;
};

export interface TOCItem {
  id: number;
  label: string;
  href: string;
  cfi?: string;
  location?: Location;
  subitems?: TOCItem[];
}

export interface PageItem {
  label: string;
}

export interface SectionItem {
  id: string;
  cfi: string;
  size: number;
  linear: string;
  location?: Location;
  pageSpread?: "left" | "right" | "center" | "";

  createDocument: () => Promise<Document>;
}

export type CFIString = string;

export type EventCallback = (e: any) => void;

export interface FoliateView extends HTMLElement {
  addEventListener: (event: string, callback: EventCallback) => void;
  removeEventListener: (event: string, callback: EventCallback) => void;
  open: (book: string | BookDoc) => Promise<void>;
  close: () => void;
  init: (options: { lastLocation: string }) => void;
  goTo: (href: number | CFIString) => void;
  goToFraction: (fraction: number) => void;
  prev: (distance?: number) => void;
  next: (distance?: number) => void;
  goLeft: () => void;
  goRight: () => void;
  getCFI: (index: number, range: Range) => string;
  resolveCFI: (cfi: string) => {
    index: number;
    anchor: (doc: Document) => Range;
  };
  // addAnnotation: (
  //   note: BookNote,
  //   remove?: boolean
  // ) => { index: number; label: string };
  // search: (
  //   config: BookSearchConfig
  // ) => AsyncGenerator<BookSearchResult | string, void, void>;
  // clearSearch: () => void;
  select: (target: string | number | { fraction: number }) => void;
  deselect: () => void;
  // initTTS: (
  //   granularity?: TTSGranularity,
  //   nodeFilter?: (node: Node) => number,
  //   highlight?: (range: Range) => void
  // ) => Promise<void>;
  book: BookDoc;
  // tts: TTS | null;
  language: {
    locale?: string;
    isCJK?: boolean;
  };
  history: {
    canGoBack: boolean;
    canGoForward: boolean;
    back: () => void;
    forward: () => void;
    clear: () => void;
  };
  renderer: {
    scrolled?: boolean;
    size: number; // current page height
    viewSize: number; // whole document view height
    start: number;
    end: number;
    heads: HTMLDivElement[] | null;
    feet: HTMLDivElement[] | null;
    page: number;
    pages: number;
    containerPosition: number;
    sideProp: "width" | "height";
    setAttribute: (name: string, value: string | number) => void;
    removeAttribute: (name: string) => void;
    next: () => Promise<void>;
    prev: () => Promise<void>;
    nextSection?: () => Promise<void>;
    prevSection?: () => Promise<void>;
    goTo?: (params: { index: number; anchor: number }) => void;
    setStyles?: (css: string) => void;
    getContents: () => { doc: Document; index?: number; overlayer?: unknown }[];
    scrollToAnchor: (anchor: number | Range) => void;
    addEventListener: (
      type: string,
      listener: EventListener,
      option?: AddEventListenerOptions
    ) => void;
    removeEventListener: (type: string, listener: EventListener) => void;
  };
}
