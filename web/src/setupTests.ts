import '@testing-library/jest-dom';

// Ensure a functional localStorage in test environment
(function ensureLocalStorage() {
  try {
    const ls = window.localStorage as any;
    if (!ls || typeof ls.setItem !== 'function' || typeof ls.getItem !== 'function') {
      throw new Error('localStorage not functional');
    }
  } catch {
    const store = new Map<string, string>();
    const memStorage: Storage = {
      get length() {
        return store.size;
      },
      clear: () => store.clear(),
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      removeItem: (key: string) => {
        store.delete(key);
      },
      setItem: (key: string, value: string) => {
        store.set(key, String(value));
      },
    } as Storage;
    Object.defineProperty(window, 'localStorage', {
      value: memStorage,
      configurable: true,
    });
  }
})();
