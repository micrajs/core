import '@/namespaces';
import '@/event-emitter';

declare global {
  namespace Application {
    /**
     * It defines all environment variables that can be used by the application.
     */
    interface EnvironmentVariables {}
  }

  namespace Micra {
    /**
     * It defines the events emitted by the Environment class.
     */
    interface EnvironmentEvents {
      /**
       * This event is emitted when an environment variable is set to an environment.
       */
      set: {
        /**
         * The name of the environment variable set.
         */
        key: keyof Application.EnvironmentVariables;

        /**
         * The value of the environment variable set.
         */
        value: string;
      };
    }

    /**
     * Environment entities are responsible for consuming environment variable definitions, validating and making them available for your application. It extends the EventEmitter class and provides a set of methods to interact with the environment variables.
     */
    interface Environment extends EventEmitter<EnvironmentEvents> {
      /**
       * It returns all definitions of a given environment instance. This will return
       * either a partial or the full EnvironmentVariables depending
       * on how many Environment sources the application is using.
       *
       * @returns All environment variables.
       *
       * @typeParam `Definitions` - The environment variables to be returned. Inferred from the `EnvironmentVariables` parameter.
       */
      all<
        Definitions extends Partial<Application.EnvironmentVariables>,
      >(): Definitions;

      /**
       * It returns a given environment variable based on a key reference.
       *
       * @param key - The key of the environment variable to be returned.
       * @param fallback - The default value to be returned if the key is not found.
       * @returns The environment variable value or the fallback value.
       *
       * @typeParam `Key` - The key of the environment variable to be returned. Inferred from the `key` parameter.
       */
      get<Key extends keyof Application.EnvironmentVariables>(
        key: Key,
        fallback?: Application.EnvironmentVariables[Key],
      ): Application.EnvironmentVariables[Key];
      get<Key extends keyof Application.EnvironmentVariables>(
        key: Key,
      ): Application.EnvironmentVariables[Key] | undefined;

      /**
       * It verifies if a given environment variable is defined.
       *
       * @param key - The key of the environment variable to be checked.
       * @returns True if the environment variable is defined, false otherwise.
       */
      has<Key extends keyof Application.EnvironmentVariables>(
        key: Key,
      ): boolean;

      /**
       * It initializes the environment variables. This method is called by the framework.
       *
       * @returns Promise that resolves when the environment variables are initialized.
       */
      init(): Promise<void>;

      /**
       * It initializes the environment variables synchronously. This method is called by the framework.
       */
      initSync(): void;

      /**
       * It validates the environment variables and throws an error if any of the
       * environment variables are missing or invalid.
       *
       * @param validator - A function that validates the environment variables.
       */
      validate(validator: EnvironmentValidator): void;
    }

    /**
     * Environment validators are used to validate the environment variables.
     * It throws a ValidationError if the validation fails.
     *
     * @param environment - The environment to be validated.
     * @throws `Micra.ValidationError` - Throws an error if the environment variables are not valid.
     */
    type EnvironmentValidator = (environment: Record<string, unknown>) => void;
  }
}

export {};
