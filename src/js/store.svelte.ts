export type ReaderSettings = {
  invertImages: boolean;
  justify: boolean;
  hyphenate: boolean;
  spacing: number;
  fontSize: number;
};

class GlobalState {
  currentBookPath = $state("/book.epub");

  settings = $state<ReaderSettings>({
    invertImages: true,
    justify: true,
    hyphenate: true,
    spacing: 14,
    fontSize: 16,
  });
}

export let store = new GlobalState();

$effect.root(() => {
  $inspect("Current: ", store.currentBookPath);
});
