import '../namespaces';
import '../service-container';
import '../application/globals/helpers';

declare global {
  namespace Micra {
    /**
     * It defines the context of a given request handler.
     */
    interface RequestHandlerContext {
      request: Request;
      config: Config;
      env: Env;
      use: Use;
    }

    /**
     * Request handlers are functions that are responsible for handling a request.
     * They are registered in the RequestHandlerManager and are executed in the
     * order they are registered.
     */
    type RequestHandler = (
      context: RequestHandlerContext,
    ) => Promise<Response | void>;

    /**
     * It manages a list of request handlers which can be extended by custom router extensions.
     * This allows extensions to define a particular way a given request type is handled.
     */
    interface RequestHandlerManager {
      use(...handlers: RequestHandler[]): this;
      handle(context: RequestHandlerContext): Promise<Response>;
    }
  }
}

export {};
