import type {PathsOf, PathValue} from '@/utilities/DotNotation';
import type {Static} from '@/utilities/Static';

declare global {
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

    interface Globals {
      /**
       * It registers the application's instance on the global scope. This is useful for debugging or testing purposes and is not recommended for production. By default it is set to false.
       */
      app: boolean;

      /**
       * It registers a getter for the application's configurations in the global scope.
       */
      config: boolean;

      /**
       * It registers a getter for the application's environment variables in the global scope.
       */
      env: boolean;

      /**
       * It registers a getter for the application's services in the global scope.
       */
      use: boolean;
    }

    interface ApplicationConfiguration {
      /**
       * An object containing the application's configurations based on the Application.Configurations interface.
       */
      configurations: {
        [Configuration in keyof Application.Configurations]:
          | Application.Configurations[Configuration]
          | Static<Application.Configurations[Configuration]>;
      };

      /**
       * The implementation of the applications's ServiceContainer.
       */
      container: Static<ServiceContainer>;

      /**
       * An object containing the application's environment classes.
       */
      environments: Record<string, Environment | Static<Environment>>;

      /**
       * An object defining which global helper should be initialized.
       */
      globals: Partial<Globals>;

      /**
       * The implementation of the applications's Kernel.
       */
      kernel: Kernel | Static<Kernel>;

      /**
       * An object containing the application's service providers.
       */
      providers: Record<string, ServiceProvider | Static<ServiceProvider>>;
    }

    /**
     * Events emitted by the application class
     */
    interface ApplicationEvents {
      /**
       * Emitted when the application will start to initialize.
       */
      willStart: void;

      /**
       * Emitted when the application will start to initialize the service container.
       */
      willInitializeContainer: void;

      /**
       * Emitted when the application has finished initializing the service container.
       */
      didInitializeContainer: ServiceContainer;

      /**
       * Emitted when the application will start to initialize the environments.
       */
      willInitializeEnvironments: void;

      /**
       * Emitted when the application has finished initializing the environments.
       */
      didInitializeEnvironments: Environment;

      /**
       * Emitted when the application will start to initialize the configurations.
       */
      willInitializeConfigurations: void;

      /**
       * Emitted when the application has finished initializing the configurations.
       */
      didInitializeConfigurations: Configuration;

      /**
       * Emitted when the application will start to initialize the service providers.
       */
      willInitializeProviders: void;

      /**
       * Emitted when the application has finished initializing the service providers.
       */
      didInitializeProviders: ServiceProvider[];

      /**
       * Emitted when the application will start to initialize the kernel.
       */
      willInitializeKernel: void;

      /**
       * Emitted when the application has finished initializing the kernel.
       */
      didInitializeKernel: Kernel;

      /**
       * Emitted when the application has finished initializing.
       */
      didStart: void;

      /**
       * Emitted when the application will start its execution.
       */
      willRun: void;

      /**
       * Emitted when an error occurs during the application's execution
       */
      onError: Micra.Error;
    }

    /**
     * The application class is the main class of the framework. It's  responsible for managing the application's setup and is the source of truth for it. It leverages core elements of Micra's architecture, including Environments, Configurations and Service Container, and receives Service Providers and a Kernel to run the application.
     */
    interface Application extends EventEmitter<ApplicationEvents> {
      /**
       * The application's configuration.
       */
      readonly configuration: Configuration;

      /**
       * The application's service container.
       */
      readonly container: ServiceContainer;

      /**
       * The application's environments.
       */
      readonly environment: Environment;

      /**
       * The application's kernel.
       */
      readonly kernel: Kernel;

      /**
       * The application's service providers.
       */
      readonly serviceProviders: ServiceProvider[];

      /**
       * It initializes a set of service providers. This can be used to lazy load service providers.
       *
       * @param serviceProviders - The service providers to register on the application.
       */
      initializeProviders(
        serviceProviders: ApplicationConfiguration['providers'],
      ): Promise<void>;

      /**
       * It initializes a set of service providers synchronously. This can be used to lazy load service providers.
       *
       * @param serviceProviders - The service providers to register on the application.
       */
      initializeProvidersSync(
        serviceProviders: ApplicationConfiguration['providers'],
      ): void;

      /**
       * It runs the application. If the application has not been initialized, it will be initialized first.
       *
       * @param configuration - The application's configuration.
       * @returns The return from the application's kernel.
       */
      run<Return = void>(
        configuration?: Partial<ApplicationConfiguration>,
      ): Promise<Return>;

      /**
       * It runs the application synchronously. If the application has not been initialized, it will be initialized first.
       *
       * @param configuration - The application's configuration.
       * @returns The return from the application's kernel.
       */
      runSync<Return = void>(
        configuration?: Partial<ApplicationConfiguration>,
      ): Return;

      /**
       * It initializes the application based on the given configuration. This method is called by the application's run method. In cases where the application is not being run, it can be called directly.
       *
       * @param configuration - The application's configuration.
       */
      start(configuration?: Partial<ApplicationConfiguration>): Promise<void>;

      /**
       * It initializes the application synchronously based on the given configuration. This method is called by the application's run method. In cases where the application is not being run, it can be called directly.
       *
       * @param configuration - The application's configuration.
       */
      startSync(configuration?: Partial<ApplicationConfiguration>): void;
    }
  }
}

export {};
