/* eslint-disable @typescript-eslint/ban-types */
/**
 * It defines the type for a static class, allowing the definition of constructor parameters and static methods.
 */
export type Constructor<
  Instance = unknown,
  Params extends Array<unknown> = [],
  StaticMethods extends Record<string, any> = {},
> = {
  new (...args: Params): Instance;
} & StaticMethods;
