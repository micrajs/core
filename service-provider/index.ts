declare global {
  namespace Micra {
    /**
     * It registers and initializes a service on the service container.
     */
    interface ServiceProvider {
      /**
       * It registers a service on the service container. This method should not be used to retrieve a service from the container as it is not guaranteed that the service is already registered.
       *
       * @param container - The service container.
       */
      register?(application: Application): void | Promise<void>;

      /**
       * It initializes a service on the service container. This method is called once every service providers' register method have been called.
       *
       * @param container - The service container.
       */
      boot?(application: Application): void | Promise<void>;
    }
  }
}

export {};
