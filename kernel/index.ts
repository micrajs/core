declare global {
  namespace Micra {
    /**
     * Kernels are the core of a Micra application. These classes are responsible for determining how a given application should be executed based on all the services available.
     *
     * @typeParam Return - The return type of the kernel's run method.
     */
    interface Kernel<Return = void> {
      /**
       * It initializes the kernel. This method is called after all of the application's services have been registered and booted. With this, the kernel can perform any necessary initialization based on all the services available.
       */
      boot?(application: Micra.Application): void | Promise<void>;

      /**
       * It runs the kernel. This method is responsible for defining how the application is executed.
       */
      run?(application: Micra.Application): Return | Promise<Return>;
    }
  }
}

export {};
