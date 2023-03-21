import '../namespaces';

declare global {
  namespace Micra {
    /**
     * It defines the engine responsible for rendering the application's UI.
     */
    interface UIEngine<ComponentType> {
      /**
       * It registers a component with the engine. This component will be used
       * to mount or render the application's UI to string.
       *
       * @param root The root component of the application.
       */
      setRoot(root: ComponentType): this;

      /**
       * It mounts the application's UI to the given element. If given a component,
       * it will mount the component to the given element. If no component is given
       * it will mount the root component.
       *
       * @param element The element to mount the application's UI to.
       * @param component An optional component to render. If not provided, the engine will render the root component.
       * @param props An optional props object to pass to the component.
       */
      mount<
        Element extends globalThis.Element | DocumentFragment,
        Props extends Record<string, any>,
      >(
        element: Element,
        component?: ComponentType,
        props?: Props,
      ): void;

      /**
       * It renders the application's UI to string. If given a component,
       * it will render the component to string. If no component is given
       * it will render the root component.
       *
       * @param component An optional component to render. If not provided, the engine will render the root component.
       * @param props An optional props object to pass to the component.
       */
      toString<Props extends Record<string, any>>(
        component?: ComponentType,
        props?: Props,
      ): string;
    }
  }
}

export {};
