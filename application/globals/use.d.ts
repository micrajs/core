import './helpers';

declare global {
  /**
   * Global helper that retrieves an instance of a service from the service container. If the service is not registered, it will throw an error.
   *
   * @param namespace - The namespace of the service.
   * @returns The service instance.
   * @throws An error if the service is not registered.
   *
   * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
   */
  const use: Micra.Use;

  interface Window {
    /**
     * Global helper that retrieves an instance of a service from the service container. If the service is not registered, it will throw an error.
     *
     * @param namespace - The namespace of the service.
     * @returns The service instance.
     * @throws An error if the service is not registered.
     *
     * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
     */
    use: Micra.Use;
  }

  namespace NodeJS {
    interface Global {
      /**
       * Global helper that retrieves an instance of a service from the service container. If the service is not registered, it will throw an error.
       *
       * @param namespace - The namespace of the service.
       * @returns The service instance.
       * @throws An error if the service is not registered.
       *
       * @typeParam `Namespace` - The namespace of the service defined in the Application.Services interface. Inferred from the `namespace` parameter.
       */
      use: Micra.Use;
    }
  }
}

export {};
