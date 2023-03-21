import '../event-emitter';
import '../namespaces';
import type {KeyMethodString} from '../utilities/KeyMethodString';
import type {Constructor} from '../utilities/Constructor';

declare global {
  namespace Application {
    /**
     * It defines the services available in the application.
     */
    interface Services {}
  }

  namespace Micra {
    /**
     * It defines the events emitted by the service container entity.
     */
    interface ServiceContainerEvents {
      /**
       * This event is emitted when a service is cloned.
       */
      clone: {
        /**
         * The cloned container's id.
         */
        containerId: string;
        /**
         * The instance of the cloned container.
         */
        container: ServiceContainer;
      };

      /**
       * This event is emitted when a service is registered.
       */
      set: {
        /**
         * The container's id.
         */
        containerId: string;
        /**
         * The service's namespace.
         */
        namespace: keyof Application.Services;
      };
    }

    /**
     * It defines a given service.
     */
    interface ServiceDefinition<Namespace extends keyof Application.Services> {
      dependencies: Exclude<keyof Application.Services, Namespace>[];
      namespace: Namespace;
      value: Constructor<Application.Services[Namespace], any[], any>;
    }

    /**
     * It defines a given factory that creates a service.
     */
    interface FactoryServiceDefinition<
      Namespace extends keyof Application.Services,
    > {
      factory: ServiceFactory<Namespace>;
      isSingleton: boolean;
      namespace: Namespace;
    }

    /**
     * It creates a given service.
     */
    type ServiceFactory<Namespace extends keyof Application.Services> = (
      container: ServiceContainer,
    ) => Application.Services[Namespace];

    /**
     * The ServiceContainer entity is responsible for storing, instantiating and retrieving service instances for the application. It extends the EventEmitter class and provides a set of methods to interact with the services.
     */
    interface ServiceContainer
      extends Micra.EventEmitter<ServiceContainerEvents> {
      /**
       * It registers a service with the container as a non-shared instance. Such service will be instantiated every time it is requested.
       *
       * @param namespace - The namespace of the service.
       * @param service - The service to be registered.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      register<Namespace extends keyof Application.Services>(
        namespace: Namespace,
        service: Constructor<Application.Services[Namespace]>,
      ): this;
      /**
       * It registers a service with the container as a non-shared instance. Such service will be instantiated every time it is requested. The service definition can be used to define the dependencies of the service, which will be resolved when the service is requested.
       *
       * @param serviceDefinition - Object that defines the service.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      register<Namespace extends keyof Application.Services>(
        serviceDefinition: ServiceDefinition<Namespace>,
      ): this;
      register<Namespace extends keyof Application.Services>(
        namespaceOrServiceDefinition: Namespace | ServiceDefinition<Namespace>,
        service?: Constructor<Application.Services[Namespace]>,
      ): this;

      /**
       * It registers a service with the container as a shared instance. Such service will be instantiated only once and then shared among all the requests.
       *
       * @param namespace - The namespace of the service.
       * @param service - The service to be registered.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      singleton<Namespace extends keyof Application.Services>(
        namespace: Namespace,
        service: Constructor<Application.Services[Namespace]>,
      ): this;
      /**
       * It registers a service with the container as a shared instance. Such service will be instantiated only once and then shared among all the requests. The service definition can be used to define the dependencies of the service, which will be resolved when the service is requested.
       *
       * @param serviceDefinition - Object that defines the service.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      singleton<Namespace extends keyof Application.Services>(
        serviceDefinition: ServiceDefinition<Namespace>,
      ): this;
      singleton<Namespace extends keyof Application.Services>(
        namespaceOrServiceDefinition: Namespace | ServiceDefinition<Namespace>,
        service?: Constructor<Application.Services[Namespace]>,
      ): this;

      /**
       * It registers a service factory with the container that returns the instance of a service. The instance returned will be shared among all the requests.
       *
       * @param namespace - The namespace of the service.
       * @param factory - The factory to be registered.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      factory<Namespace extends keyof Application.Services>(
        namespace: Namespace,
        factory: ServiceFactory<Namespace>,
      ): this;
      /**
       * It registers a service factory with the container that returns the instance of a service. The service definition can be used to define is this service should be resolved as a singleton or not.
       *
       * @param serviceDefinition - Object that defines the service.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      factory<Namespace extends keyof Application.Services>(
        serviceDefinition: FactoryServiceDefinition<Namespace>,
      ): this;
      factory<Namespace extends keyof Application.Services>(
        namespaceOrServiceDefinition: Namespace | ServiceDefinition<Namespace>,
        factory?: ServiceFactory<Namespace>,
      ): this;

      /**
       * It registers a service with the container as a shared instance. Such service will not be instantiated and will be returned as defined.
       *
       * @param namespace - The namespace of the service.
       * @param value - The service to be registered.
       * @returns The container instance.
       *
       * @emits ServiceContainerEvents.set
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      value<Namespace extends keyof Application.Services>(
        namespace: Namespace,
        value: Application.Services[Namespace],
      ): this;

      /**
       * It retrieves a service from the container.
       *
       * @param namespace - The namespace of the service to be retrieved.
       * @returns The service instance or value.
       * @throws An error if the service is not found.
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      use<Namespace extends keyof Application.Services>(
        namespace: Namespace,
      ): Application.Services[Namespace];

      /**
       * It verifies if a service is registered in the container.
       *
       * @param namespace - The namespace of the service to be checked.
       * @returns True if the service is registered, false otherwise.
       */
      has<Namespace extends keyof Application.Services>(
        namespace: Namespace,
      ): boolean;

      /**
       * It clones the current container and returns a new instance.
       *
       * @returns A new instance of the container.
       *
       * @emits ServiceContainerEvents.clone
       */
      clone(): ServiceContainer;
    }

    /**
     * It represents the namespaces and methods in the service container with a given type in the form of `namespace` or `namespace.method`.
     */
    type ServiceWithType<Type> = KeyMethodString<
      Type,
      Application.Services,
      keyof Application.Services
    >;

    /**
     * It represents either a value of a given type or a namespaces in the service container with the given type in the form of `namespace` or `namespace.method`.
     */
    type TypeOrService<Type> = Type | ServiceWithType<Type>;
  }
}

export {};
