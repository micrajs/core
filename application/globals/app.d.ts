declare global {
  /**
   * The application's instance. This is useful for debugging or testing purposes and is not recommended for production.
   */
  const app: Micra.Application;

  interface Window {
    /**
     * The application's instance. This is useful for debugging or testing purposes and is not recommended for production.
     */
    app: Micra.Application;
  }

  namespace NodeJS {
    interface Global {
      /**
       * The application's instance. This is useful for debugging or testing purposes and is not recommended for production.
       */
      app: Micra.Application;
    }
  }
}

export {};
