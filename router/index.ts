import '@/namespaces';
import '@/service-container';
import '@/application/globals/helpers';
import type {PathOptions, PathParams} from '@/utilities/PathParams';

declare global {
  namespace Application {
    /**
     * It defines router extensions.
     */
    interface Routers {}
  }

  namespace Micra {
    /**
     * It defines the context passed into route handlers and middlewares.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    interface RouteHandlerContext<
      Path extends string = string,
      Options extends PathOptions = RoutePathOptions,
    > {
      config: Config;
      env: Env;
      params: PathParams<Path, Options>;
      request: Request;
      use: Use;
    }

    type NextFunction = (err?: Error) => Promise<void | Response>;

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
      context: RouteHandlerContext<Path, Options>,
      next: NextFunction,
    ) => Promise<void | Response>;

    /**
     * It handles a request to a given route. This method is called with the HandlerContext and should return a Response object.
     *
     * @param context - The context where the handler is called.
     *
     * @typeParam `Path` - The path of the route.
     * @typeParam `Options` - The options to identify path parameters.
     */
    type RouteHandler<
      Path extends string = string,
      Options extends PathOptions = RoutePathOptions,
    > = (context: RouteHandlerContext<Path, Options>) => Promise<Response>;

    /**
     * Function used to define a route in the Router.
     *
     * @typeParam `Route` - The route builder that's returned.
     */
    type RouteCreator<
      CustomRouteBuilder extends RouteBuilder = RouteBuilder,
      Options extends PathOptions = RoutePathOptions,
    > = {
      /**
       * It defines a function that is used to define a route in the Router.
       *
       * @param path - The path of the route.
       * @param handler - The route handler.
       *
       * @typeParam `Path` - The path of the route. Inferred from the `path` parameter.
       * @typeParam `Options` - The options to identify path parameters.
       */
      <Path extends string>(
        path: Path,
        handler: RouteHandler<Path, Options>,
      ): CustomRouteBuilder;
      /**
       * It defines a function that is used to define a route in the Router.
       *
       * @param path - The path of the route.
       * @param service - The namespace.method of the service to retrieve from the service container.
       */
      <Path extends string>(
        path: Path,
        service: ServiceWithType<RouteHandler<Path, Options>>,
      ): CustomRouteBuilder;
      <Path extends string>(
        path: Path,
        serviceOrHandler: TypeOrService<RouteHandler<Path, Options>>,
      ): CustomRouteBuilder;
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
      readonly definition: Path;

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
      match(path: string): PathParams<Path, Options>;

      /**
       * It compiles a path string from the path parameters.
       *
       * @param parameters - The path parameters to generate.
       */
      toString(parameters?: PathParams<Path, Options>): string;

      /**
       * It adds a prefix to the route's path.
       *
       * @param pathPrefix - The path prefix to use.
       */
      prefix<Prefix extends string>(
        pathPrefix: Prefix,
      ): RoutePath<`${Prefix}${Options['PATH_SEPARATOR']}${Path}`, Options>;
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
       * A unique identifier for the route.
       */

      readonly id: string;
      /**
       * The route handler.
       */
      handler: TypeOrService<RouteHandler<Path, Options>>;

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
      middlewares: TypeOrService<Middleware>[];

      /**
       * The route's path.
       */
      path: RoutePath<Path, Options>;

      /**
       * The route's nested routes.
       */
      nested: RouteRegistry<Options>;
    }

    /**
     * It defines a route registry. This is used to register and find routes and middlewares.
     *
     * @typeParam `Options` - The options to identify path parameters.
     */
    interface RouteRegistry<Options extends PathOptions = RoutePathOptions> {
      /**
       * It determines if the route registry is frozen. If it is frozen, new routes and middlewares cannot be added.
       */
      readonly frozen: boolean;

      /**
       * It defines the list of middlewares to be ran before the registered routes.
       */
      readonly middlewares: Readonly<TypeOrService<Middleware>[]>;

      /**
       * It retrieves all routes that are registered to a given method.
       *
       * @param method - The method in which the routes are allowed to be called.
       */
      findAll(path: string, method: string): Readonly<Route<string, Options>>[];
      /**
       * It retrieves all routes that are registered to a given list of methods.
       *
       * @param methods - The methods in which the routes are allowed to be called.
       */
      findAll(
        path: string,
        methods: string[],
      ): Readonly<Route<string, Options>>[];
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
      ): Readonly<Route<string, Options>> | undefined;
      /**
       * It retrieves a route by its name and a given method.
       *
       * @param name - The route name.
       * @param method - The method in which the route is allowed to be called.
       */
      findByName(
        name: string,
        method: string,
      ): Readonly<Route<string, Options>> | undefined;
      /**
       * It retrieves a route by its name.
       *
       * @param name - The route name.
       */
      findByName(name: string): Readonly<Route<string, Options>> | undefined;

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
       * @param routes - The route to be registered.
       */
      register(...routes: Route<any, Options>[]): this;

      /**
       * It registers a new list of middlewares to be ran before the registered routes.
       *
       * @param middleware - The middleware to be registered.
       */
      use(...middleware: TypeOrService<Middleware>[]): this;

      /**
       * It freezes the route registry. If it is frozen, new routes and middlewares cannot be added.
       */
      freeze(): this;
    }

    /**
     * It defines a route builder. This class is used to fluently define routes and is returned by the `RouteCreator` methods. This can be extended to define more specialized builders for different route types.
     */
    interface RouteBuilder {
      /**
       * It defines the name of the route.
       *
       * @param name - The route name.
       */
      name(name: string): this;

      /**
       * It adds a list of middlewares to be ran before the route's handler.
       */
      middlewares(...middlewares: TypeOrService<Middleware>[]): this;

      /**
       * It adds nested routes.
       */
      nested(routeGroup: (router: Router) => void): this;
    }

    interface RouteGroupBuilder {
      /**
       * It sets the prefix for all routes within the route group.
       *
       * @param prefix - The prefix to be added to the route path.
       */
      prefix(prefix: string): this;

      /**
       * It adds a list of middlewares to be ran before all routes within the route group.
       */
      middlewares(...middlewares: TypeOrService<Middleware>[]): this;
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
      any<Path extends string>(
        path: Path,
        handler: RouteHandler<Path, Options>,
      ): RouteBuilder;
      any<Path extends string>(
        path: Path,
        service: ServiceWithType<RouteHandler<Path, Options>>,
      ): RouteBuilder;
      any<Path extends string>(
        path: Path,
        serviceOrHandler: TypeOrService<RouteHandler<Path, Options>>,
      ): RouteBuilder;

      /**
       * It defines a route that is executed in any of the given methods.
       *
       * @param methods - The methods in which the route is allowed to be called.
       * @param path - The path of the route.
       * @param handler - The route handler.
       */
      register<Path extends string>(
        methods: string[],
        path: Path,
        handler: RouteHandler<Path, Options>,
      ): RouteBuilder;
      /**
       * It defines a route that is executed in any of the given methods.
       *
       * @param methods - The methods in which the route is allowed to be called.
       * @param path - The path of the route.
       * @param service - The namespace of the service to be called.
       */
      register<Path extends string>(
        methods: string[],
        path: Path,
        service: ServiceWithType<RouteHandler<Path, Options>>,
      ): RouteBuilder;
      register<Path extends string>(
        methods: string[],
        path: Path,
        serviceOrHandler: TypeOrService<RouteHandler<Path, Options>>,
      ): RouteBuilder;

      /**
       * It extends the Router with custom methods defined by the Application.Routers interface.
       *
       * @param definitions - The definitions to be registered.
       */
      extend(definitions: Partial<RouterExtensionDefinition<Options>>): this;

      /**
       * It creates a new route group. This allows you to share route attributes across a large number of routes without needing to define those attributes on each individual route.
       *
       * @param routeGroup - The route group
       */
      group(routeGroup: (router: Router<Options>) => void): RouteGroupBuilder;

      /**
       * It adds a list of middlewares to be ran before the route's handler.
       */
      middlewares(...middlewares: TypeOrService<Middleware>[]): this;

      /**
       * It returns a new Router instance including all extensions with a new registry.
       *
       * @param registry - A route registry to be used instead of the default one.
       */
      clone(registry?: RouteRegistry<Options>): Router<Options>;
    }

    type RouterExtensionDefinition<
      Options extends PathOptions = RoutePathOptions,
    > = {
      [Extension in keyof Application.Routers]: RouterExtensionProvider<
        Extension,
        Options
      >;
    };

    type RouterExtensionProvider<
      Extension extends keyof Application.Routers = keyof Application.Routers,
      Options extends PathOptions = RoutePathOptions,
    > = (router: BaseRouter<Options>) => Application.Routers[Extension];

    /**
     * This class is used to define routes and middlewares that can be executed by the Application.
     */
    type Router<Options extends PathOptions = RoutePathOptions> =
      BaseRouter<Options> & Application.Routers;
  }
}

export {};
