import type {DeepPartial} from '@/utilities/DeepPartial';

declare global {
  namespace Application {
    /**
     * It defines the configurations of the application.
     */
    interface Configurations {}
  }

  namespace Micra {
    interface ConfigurationEvents {
      /**
       * This event is emitted when a configuration is set.
       */
      set: {
        /**
         * The name of the configuration set.
         */
        key: keyof Application.Configurations;

        /**
         * The value of the configuration set.
         */
        value: DeepPartial<Application.Configurations>;
      };
    }

    /**
     * The Configuration entity is responsible for storing and retrieving configuration for the application's services. It extends the EventEmitter class and provides a set of methods to interact with the configurations.
     */
    interface Configuration extends EventEmitter<ConfigurationEvents> {
      /**
       * It returns the configuration for a given key. If the key is not found, it will returns undefined.
       *
       * @param key - The key of the configuration to be returned.
       * @returns The configuration value or undefined.
       *
       * @typeParam `Key` - The key of the configuration to be returned. Inferred from the `key` parameter.
       */
      get<Key extends keyof Application.Configurations>(
        key: Key,
      ): Application.Configurations[Key] | undefined;
      /**
       * It returns the configuration for a given key. If the key is not found, it will return the fallback value provided.
       *
       * @param key - The key of the configuration to be returned.
       * @param fallback - The default value to be returned if the key is not found.
       * @returns The configuration value or the fallback value.
       *
       * @typeParam `Key` - The key of the configuration to be returned. Inferred from the `key` parameter.
       */
      get<Key extends keyof Application.Configurations>(
        key: Key,
        fallback: Application.Configurations[Key],
      ): Application.Configurations[Key];
      get<Key extends keyof Application.Configurations>(
        key: Key,
        fallback?: Application.Configurations[Key],
      ): Application.Configurations[Key] | undefined;

      /**
       * It verifies if a configuration exists for a given key.
       *
       * @param key - The key of the configuration to be verified.
       * @returns True if the configuration exists, false otherwise.
       *
       * @typeParam `Key` - The key of the configuration to be verified. Inferred from the `key` parameter.
       */
      has<Key extends keyof Application.Configurations>(key: Key): boolean;

      /**
       * It sets the configuration for a given key.
       *
       * @param key - The key of the configuration to be set.
       * @param value _The value of the configuration to be set.
       * @returns The configuration value.
       *
       * @typeParam `Key` - The key of the configuration to be set. Inferred from the `key` parameter.
       */
      set<Key extends keyof Application.Configurations>(
        key: Key,
        value: Application.Configurations[Key],
      ): void;
    }
  }
}

export {};
