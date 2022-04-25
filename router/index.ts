import '@/namespace';
import '@/service-container';
import {PathOptions, PathParams} from '@/utilities/PathParams';

declare global {
  namespace Application {
    /**
     * It defines router extensions.
     */
    interface Routers extends Micra.RouterExtension {}
  }

  namespace Micra {
    /**
     * It defines the context passed into route handlers and middlewares.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    type HandlerContext<
      Path extends string,
      Options extends PathOptions = RoutePathOptions,
    > = {
      request: Request;
      params: PathParams<Path, Options>;
    };

    type NextFunction = (err?: Error) => void;

    /**
     * It defines a route middleware.
     *
     * @param context - The context where the middleware is called.
     * @param next - The next function to call.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    type Middleware = <
      Path extends string = string,
      Options extends PathOptions = RoutePathOptions,
    >(
      context: HandlerContext<Path, Options>,
      next: NextFunction,
    ) => Promise<void>;

    /**
     * It handles a request to a given route. This method is called with the HandlerContext and should return a Response object.
     *
     * @param context - The context where the handler is called.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    type Handler<
      Path extends string = string,
      Options extends PathOptions = RoutePathOptions,
    > = (context: HandlerContext<Path, Options>) => Promise<Response>;

    /**
     * It defines a function that is used to define a route in the Router.
     *
     * @typeParam `Route` - The route builder that's returned.
     */
    type RouteDefinition<Route extends RouteBuilder = RouteBuilder> = {
      /**
       * It defines a function that is used to define a route in the Router.
       *
       * @param path - The path of the route.
       * @param handler - The route handler.
       *
       * @typeParam `Path` - The path of the route. Inferred from the `path` parameter.
       * @typeParam `Options` - The options to identify path parameters.
       */
      <Path extends string, Options extends PathOptions = RoutePathOptions>(
        path: Path,
        handler: Handler<Path, Options>,
      ): Route;
      /**
       * It defines a function that is used to define a route in the Router.
       *
       * @param path - The path of the route.
       * @param service - The namespace.method of the service to retrieve from the service container.
       */
      (path: string, service: ServicesWithType<Handler>): Route;
    };

    /**
     * It defines a route's path and utilities to test, parse, and generate path parameters.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    interface RoutePath<
      Path extends string,
      Options extends PathOptions = RoutePathOptions,
    > {
      /**
       * The path of the route.
       */
      readonly path: Path;

      /**
       * It tests if the path matches the route.
       *
       * @param path - The path to parse.
       * @return True if the path matches the route's path.
       */
      test(path: string): boolean;

      /**
       * It parses the path into path parameters.
       *
       * @param path - The path to parse.
       */
      exec(path: string): PathParams<Path, Options>;

      /**
       * It compiles a path string from the path parameters.
       *
       * @param parameters - The path parameters to generate.
       */
      toString(parameters?: PathParams<Path, Options>): string;
      /**
       * It compiles a path string from the path options.
       *
       * @param options - The path options including parameters, query parameters and hash parameters.
       */
      toString(options: {
        /** The path parameters to generate the path */
        params?: PathParams<Path, Options>;
        /** Query parameters to be appended to the path */
        query?: Record<string, any>;
        /** Hash parameter to be appended to the path */
        hash?: string;
      }): string;
    }

    /**
     * Default options to identify path parameters.
     *
     * @example `/:paramName(enum1|enum2|enum3)?`
     */
    type RoutePathOptions = PathOptions<'/', ':', '', '(', ')', '|', '?'>;

    /**
     * It defines a route.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    interface Route<
      Path extends string = string,
      Options extends PathOptions = RoutePathOptions,
    > {
      /**
       * The route handler.
       */
      handler: Handler<Path, Options>;

      /**
       * The methods in which the route is allowed to be called.
       */
      methods: string[];

      /**
       * An optional route name.
       */
      name?: string;

      /**
       * Middlewares or namespace.method of the service to be called before the route handler.
       */
      middlewares: (Middleware | ServicesWithType<Middleware>)[];

      /**
       * The route's path.
       */
      path: RoutePath<Path, Options>;
    }

    /**
     * It defines a route registry. This is used to register and find routes and middlewares.
     *
     * @typeParam `Options` - The options to identify path parameters.
     */
    interface RouteRegistry<Options extends PathOptions = RoutePathOptions> {
      /**
       * It defines the list of middlewares to be ran before the registered routes.
       */
      readonly middlewares: (Middleware | ServicesWithType<Middleware>)[];

      /**
       * It retrieves all routes that are registered to a given method.
       *
       * @param method - The method in which the routes are allowed to be called.
       */
      findAll(method: string): Readonly<Route<string, Options>>[];
      /**
       * It retrieves all routes that are registered to a given list of methods.
       *
       * @param methods - The methods in which the routes are allowed to be called.
       */
      findAll(methods: string[]): Readonly<Route<string, Options>>[];
      /**
       * It retrieves all registered routes.
       */
      findAll(): Readonly<Route<string, Options>>[];

      /**
       * It retrieves a route by its name and a list of methods.
       *
       * @param name - The route name.
       * @param methods - The methods in which the route is allowed to be called.
       */
      findByName(
        name: string,
        methods: string[],
      ): Readonly<Route<string, Options>>[];
      /**
       * It retrieves a route by its name and a given method.
       *
       * @param name - The route name.
       * @param method - The method in which the route is allowed to be called.
       */
      findByName(
        name: string,
        method: string,
      ): Readonly<Route<string, Options>>[];
      /**
       * It retrieves a route by its name.
       *
       * @param name - The route name.
       */
      findByName(name: string): Readonly<Route<string, Options>>[];

      /**
       * It retrieves a route by its path and a given method. If no route is found, it returns undefined.
       *
       * @param path - The path of the route to be retrieved.
       * @param method - The method in which the route is allowed to be called.
       *
       * @typeParam `Path` - The path of the route. Inferred from the `path` parameter.
       */
      find<Path extends string>(
        path: Path,
        method: string,
      ): Readonly<Route<Path, Options>> | undefined;
      /**
       * It retrieves a route by its path and a list of methods. If no route is found, it returns undefined.
       *
       * @param path - The path of the route to be retrieved.
       * @param methods - List of methods in which the route is allowed to be called.
       *
       * @typeParam `Path` - The path of the route. Inferred from the `path` parameter.
       */
      find<Path extends string>(
        path: Path,
        methods: string[],
      ): Readonly<Route<Path, Options>> | undefined;
      /**
       * It retrieves a route by its path. If no route is found, it returns undefined.
       *
       * @param path - The path of the route to be retrieved.
       */
      find<Path extends string>(
        path: Path,
      ): Readonly<Route<Path, Options>> | undefined;

      /**
       * It registers a new route.
       *
       * @param route - The route to be registered.
       */
      register(route: Route<string, Options>): this;

      /**
       * It registers a new list of middlewares to be ran before the registered routes.
       *
       * @param middleware - The middleware to be registered.
       */
      use(...middleware: (Middleware | ServicesWithType<Middleware>)[]): this;
    }

    /**
     * It defines a route builder. This class is used to fluently define routes and is returned by the `RouteDefinition` methods. This can be extended to define more specialized builders for different route types.
     */
    interface RouteBuilder {
      /**
       * It defines the name of the route.
       *
       * @param name - The route name.
       */
      name(name: string): this;

      /**
       * It defines the route's prefix.
       *
       * @param prefix - The prefix to be added to the route path.
       */
      prefix(prefix: string): this;

      /**
       * It adds a list of middlewares to be ran before the route's handler.
       */
      middleware(
        ...middleware: (Middleware | ServicesWithType<Middleware>)[]
      ): this;
    }

    /**
     * It defines the base methods for Micra's Router class. This class is used to define routes and middlewares that can be executed by the Application.
     *
     * @typeParam `Options` - The options to identify path parameters.
     */
    interface BaseRouter<Options extends PathOptions = RoutePathOptions> {
      /**
       * It stores and retrieves the Application's routes.
       */
      readonly registry: RouteRegistry<Options>;

      /**
       * It defines a route that is executed with any method.
       */
      any: RouteDefinition;

      /**
       * It defines a route that is executed in any of the given methods.
       *
       * @param methods - The methods in which the route is allowed to be called.
       * @param path - The path of the route.
       * @param handler - The route handler.
       */
      match<Path extends string>(
        methods: string[],
        path: Path,
        handler: Handler,
      ): RouteBuilder;
      /**
       * It defines a route that is executed in any of the given methods.
       *
       * @param methods - The methods in which the route is allowed to be called.
       * @param path - The path of the route.
       * @param service - The namespace of the service to be called.
       */
      match(
        methods: string[],
        path: string,
        service: ServicesWithType<Handler>,
      ): RouteBuilder;

      /**
       * It extends the Router with custom methods defined by the Application.Routers interface.
       *
       * @param definitions - The definitions to be registered.
       */
      extend(definitions: Partial<Application.Routers>): this;

      /**
       * It creates a new route group. This allows you to share route attributes across a large number of routes without needing to define those attributes on each individual route.
       *
       * @param routeGroup - The route group
       */
      group(routeGroup: (router: Router) => void): RouteBuilder;
    }

    type RouterExtension = {
      [key: string]: Micra.RouteDefinition;
    } & {
      [Key in keyof Micra.BaseRouter]: never;
    };

    /**
     * This class is used to define routes and middlewares that can be executed by the Application.
     */
    type Router = BaseRouter & Application.Routers;
  }
}

export {};
