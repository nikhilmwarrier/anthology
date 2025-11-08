export type ReaderSettings = {
  invertImages: boolean;
  justify: boolean;
  hyphenate: boolean;
  spacing: number;
  fontSize: number;
};

class GlobalState {
  #darkMode = $state<boolean>(true);
  #blackMode = $derived<boolean>(this.#darkMode);

  settings = $state<ReaderSettings>({
    invertImages: true,
    justify: true,
    hyphenate: true,
    spacing: 14,
    fontSize: 16,
  });
}

export let store = new GlobalState();
