class GlobalState {
  #darkMode = $state<boolean>(true);
  #blackMode = $derived<boolean>(this.#darkMode);

  get darkMode() {
    return this.#darkMode;
  }

  get blackMode() {
    return this.#blackMode;
  }

  set darkMode(v) {
    this.#darkMode = v;
  }

  set blackMode(v) {
    this.#blackMode = v;
  }
}

export let store = new GlobalState();
