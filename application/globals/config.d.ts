import './helpers';

declare global {
  /**
   * Global helper that retrieves a configuration for a given dot notation path. If the path is not found, it will return undefined or the fallback value provided.
   *
   * @param path - The dot notation path of a given key.
   * @param fallback - (optional) The default value to be returned if the key is not found.
   * @returns The configuration value or the fallback value.
   *
   * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
   */
  const config: Micra.Config;

  interface Window {
    /**
     * Global helper that retrieves a configuration for a given dot notation path. If the path is not found, it will return undefined or the fallback value provided.
     *
     * @param path - The dot notation path of a given key.
     * @param fallback - (optional) The default value to be returned if the key is not found.
     * @returns The configuration value or the fallback value.
     *
     * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
     */
    config: Micra.Config;
  }

  namespace NodeJS {
    interface Global {
      /**
       * Global helper that retrieves a configuration for a given dot notation path. If the path is not found, it will return undefined or the fallback value provided.
       *
       * @param path - The dot notation path of a given key.
       * @param fallback - (optional) The default value to be returned if the key is not found.
       * @returns The configuration value or the fallback value.
       *
       * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
       */
      config: Micra.Config;
    }
  }
}

export {};
