import '@/namespaces';
import '@/application';

declare global {
  namespace Micra {
    /**
     * It registers and initializes a service on the service container.
     */
    interface ServiceProvider {
      /**
       * It registers globals on the service container.
       *
       * @param application - The application.
       */
      registerGlobal?(application: Application): void | Promise<void>;

      /**
       * It bootstraps globals on the service container. This may be used to initialize globals that require
       * other globals to be registered or to validate the state of the application.
       *
       * @param application - The application.
       */
      bootGlobal?(application: Application): void | Promise<void>;

      /**
       * It registers environments on the service container. This method should not be used to consume environment
       * variables as it is not guaranteed that the environments are already initialized.
       *
       * @param application - The application.
       */
      registerEnvironment?(application: Application): void | Promise<void>;

      /**
       * It bootstraps environments on the service container. This may be used to initialize environments that require
       * other environments to be registered or to validate the state of the application.
       *
       * @param application - The application.
       */
      bootEnvironment?(application: Application): void | Promise<void>;

      /**
       * It registers configurations on the service container. This method should not be used to consume configuration
       * variables as it is not guaranteed that the configurations are already initialized.
       *
       * @param application - The application.
       */
      registerConfiguration?(application: Application): void | Promise<void>;

      /**
       * It bootstraps configurations on the service container. This may be used to initialize configurations that require
       * other configurations to be registered or to validate the state of the application.
       *
       * @param application - The application.
       */
      bootConfiguration?(application: Application): void | Promise<void>;

      /**
       * It registers services on the service container. This method should not be used to retrieve a service from the container as it is not guaranteed that the service is already registered.
       *
       * @param application - The application.
       */
      register?(application: Micra.Application): void | Promise<void>;

      /**
       * It initializes services on the service container. This method is called once every service providers' register method have been called.
       *
       * @param application - The application.
       */
      boot?(application: Micra.Application): void | Promise<void>;

      /**
       * It terminates services on the service container. This method is called upon application termination.
       *
       * @param application - The application.
       */
      terminate?(application: Micra.Application): void | Promise<void>;
    }
  }
}

export {};
