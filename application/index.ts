import '@/namespaces';
import '@/configuration';
import '@/environment';
import '@/error';
import '@/event-emitter';
import '@/kernel';
import '@/service-container';
import '@/service-provider';
import '@/application/globals/helpers';
import type {Static} from '@/utilities/Static';

declare global {
  namespace Micra {
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

    interface ApplicationConfiguration<KernelReturn = void> {
      /**
       * An object containing the application's configurations based on the Application.Configurations interface.
       */
      configurations: Partial<{
        [Configuration in keyof Application.Configurations]:
          | Application.Configurations[Configuration]
          | Static<Application.Configurations[Configuration]>;
      }>;

      /**
       * The implementation of the applications's ServiceContainer.
       */
      container: Static<ServiceContainer>;

      /**
       * An object containing the application's environment classes.
       */
      environments:
        | Record<string, Environment | Static<Environment>>
        | (Environment | Static<Environment>)[];

      /**
       * An object defining which global helper should be initialized.
       */
      globals: Partial<Globals>;

      /**
       * The implementation of the applications's Kernel.
       */
      kernel: Kernel<KernelReturn> | Static<Kernel<KernelReturn>>;

      /**
       * An object containing the application's service providers.
       */
      providers:
        | Record<string, ServiceProvider | Static<ServiceProvider>>
        | (ServiceProvider | Static<ServiceProvider>)[];
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
      containerReady: ServiceContainer;

      /**
       * Emitted when the application will start to initialize the environments.
       */
      willInitializeEnvironments: void;

      /**
       * Emitted when the application has finished initializing the environments.
       */
      environmentsReady: Environment;

      /**
       * Emitted when the application will start to initialize the configurations.
       */
      willInitializeConfigurations: void;

      /**
       * Emitted when the application has finished initializing the configurations.
       */
      configurationsReady: Configuration;

      /**
       * Emitted when the application will start to initialize the service providers.
       */
      willInitializeProviders: void;

      /**
       * Emitted when the application has finished initializing the service providers.
       */
      providersReady: ServiceProvider[];

      /**
       * Emitted when the application will start to initialize the kernel.
       */
      willInitializeKernel: void;

      /**
       * Emitted when the application has finished initializing the kernel.
       */
      kernelReady: Kernel;

      /**
       * Emitted when the application has finished initializing.
       */
      applicationReady: void;

      /**
       * Emitted when the application will start its execution.
       */
      willRun: void;

      /**
       * Emitted when an error occurs during the application's execution
       */
      error: Micra.Error;
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
      initializeProviders(
        serviceProviders: ApplicationConfiguration['providers'],
      ): void;
      initializeProviders(
        serviceProviders: ApplicationConfiguration['providers'],
      ): Promise<void> | void;

      /**
       * It runs the application. If the application has not been initialized, it will be initialized first.
       *
       * @param configuration - The application's configuration.
       * @returns The return from the application's kernel.
       */
      run<Return = void>(
        configuration?: Partial<ApplicationConfiguration<Return>>,
      ): Promise<Return>;

      /**
       * It runs the application synchronously. If the application has not been initialized, it will be initialized first.
       *
       * @param configuration - The application's configuration.
       * @returns The return from the application's kernel.
       */
      run<Return = void>(
        configuration?: Partial<ApplicationConfiguration<Return>>,
      ): Return;
      run<Return = void>(
        configuration?: Partial<ApplicationConfiguration<Return>>,
      ): Promise<Return> | Return;

      /**
       * It initializes the application based on the given configuration. This method is called by the application's run method. In cases where the application is not being run, it can be called directly.
       *
       * @param configuration - The application's configuration.
       */
      start<Return = void>(
        configuration?: Partial<ApplicationConfiguration<Return>>,
      ): Promise<void>;

      /**
       * It initializes the application synchronously based on the given configuration. This method is called by the application's run method. In cases where the application is not being run, it can be called directly.
       *
       * @param configuration - The application's configuration.
       */
      start<Return = void>(
        configuration?: Partial<ApplicationConfiguration<Return>>,
      ): void;
      start<Return = void>(
        configuration?: Partial<ApplicationConfiguration<Return>>,
      ): Promise<void> | void;
    }
  }
}

export {};
