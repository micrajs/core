import '@/namespaces';
import '@/event-emitter';
import type {PathsOf, PathValue, PathValueUnion} from '@/utilities/DotNotation';

declare global {
  namespace Application {
    /**
     * It defines the configurations of the application.
     */
    interface Configurations {}
  }

  namespace Micra {
    /**
     * It defines the events emitted by the configuration class.
     */
    interface ConfigurationEvents {
      /**
       * This event is emitted when a configuration is set.
       */
      set: PathValueUnion<Application.Configurations>;
    }

    /**
     * The Configuration entity is responsible for storing and retrieving configuration for the application's services. It extends the EventEmitter class and provides a set of methods to interact with the configurations.
     */
    interface Configuration extends EventEmitter<ConfigurationEvents> {
      /**
       * It returns the configuration for a given key. If the key is not found, it returns undefined.
       *
       * @param path - The dot notation path of a given key.
       * @returns The configuration value or undefined.
       *
       * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
       */
      get<Path extends PathsOf<Application.Configurations>>(
        path: Path,
      ): PathValue<Application.Configurations, Path> | undefined;
      /**
       * It returns the configuration for a given key. If the key is not found, it will return the fallback value provided.
       *
       * @param path - The dot notation path of a given key.
       * @param fallback - The default value to be returned if the key is not found.
       * @returns The configuration value or the fallback value.
       *
       * @typeParam `Path` - The dot notation path of a given key. Inferred from the `key` parameter.
       */
      get<Path extends PathsOf<Application.Configurations>>(
        path: Path,
        fallback: PathValue<Application.Configurations, Path>,
      ): PathValue<Application.Configurations, Path>;
      get<Path extends PathsOf<Application.Configurations>>(
        path: Path,
        fallback?: PathValue<Application.Configurations, Path>,
      ): PathValue<Application.Configurations, Path> | undefined;

      /**
       * It verifies if a configuration exists for a given key.
       *
       * @param path - The key of the configuration to be verified.
       * @returns True if the configuration exists, false otherwise.
       *
       * @typeParam `Path` - The key of the configuration to be verified. Inferred from the `key` parameter.
       */
      has<Path extends PathsOf<Application.Configurations>>(
        path: Path,
      ): boolean;

      /**
       * It sets the configuration for a given key.
       *
       * @param path - The key of the configuration to be set.
       * @param value _The value of the configuration to be set.
       * @returns The configuration value.
       *
       * @typeParam `Path` - The key of the configuration to be set. Inferred from the `key` parameter.
       */
      set<Path extends PathsOf<Application.Configurations>>(
        path: Path,
        value: PathValue<Application.Configurations, Path>,
      ): void;
    }
  }
}

export {};
