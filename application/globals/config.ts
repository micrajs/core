import type {PathsOf, PathValue} from '@/utilities/DotNotation';

declare global {
  namespace Micra {
    interface Config {
      /**
       * Global helper that retrieves a configuration for a given path. If the key is not found, it returns undefined.
       *
       * @param path - The dot notation path of a given key.
       * @returns The configuration value or undefined.
       *
       * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
       */
      <Path extends PathsOf<Application.Configurations>>(path: Path):
        | PathValue<Application.Configurations, Path>
        | undefined;
      /**
       * Global helper that retrieves a configuration for a given dot notation path. If the path is not found, it will return the fallback value provided.
       *
       * @param path - The dot notation path of a given key.
       * @param fallback - The default value to be returned if the key is not found.
       * @returns The configuration value or the fallback value.
       *
       * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
       */
      <Path extends PathsOf<Application.Configurations>>(
        path: Path,
        fallback: PathValue<Application.Configurations, Path>,
      ): PathValue<Application.Configurations, Path>;
      <Path extends PathsOf<Application.Configurations>>(
        path: Path,
        fallback?: PathValue<Application.Configurations, Path>,
      ): PathValue<Application.Configurations, Path> | undefined;
    }
  }

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
