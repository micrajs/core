import type {PathsOf, PathValue} from '../../utilities/DotNotation';

declare global {
  namespace Application {
    interface Configurations {}
    interface EnvironmentVariables {}
    interface Services {}
  }
  namespace Micra {
    /**
     * Global helper that retrieves an instance of a service from the service container. If the service is not registered, it will throw an error.
     *
     * @param namespace - The namespace of the service.
     * @returns The service instance.
     * @throws An error if the service is not registered.
     *
     * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
     */
    type Use = <Namespace extends keyof Application.Services>(
      namespace: Namespace,
    ) => Application.Services[Namespace];

    /**
     * Global helper that retrieves an environment variable from one of the registered environment providers.
     */
    interface Env {
      /**
       * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns undefined.
       *
       * @param key - The key of the environment variable.
       * @returns The environment variable value or undefined.
       *
       * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
       */
      <Key extends keyof Application.EnvironmentVariables>(key: Key):
        | Application.EnvironmentVariables[Key]
        | undefined;
      /**
       * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns a given fallback.
       *
       * @param key - The key of the environment variable.
       * @param fallback - The fallback value of type defined by the Application.EnvironmentVariables[Key].
       * @returns The environment variable value or the given fallback.
       *
       * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
       */
      <Key extends keyof Application.EnvironmentVariables>(
        key: Key,
        fallback: Application.EnvironmentVariables[Key],
      ): Application.EnvironmentVariables[Key];
      <Key extends keyof Application.EnvironmentVariables>(
        key: Key,
        fallback?: Application.EnvironmentVariables[Key],
      ): Application.EnvironmentVariables[Key] | undefined;
    }

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
}

export {};
