/**
 * It defines the type for a static class, allowing the definition of constructor parameters and static methods.
 */
export type Static<
  Instance = unknown,
  ConstructorParameters extends Array<unknown> = [],
  // eslint-disable-next-line @typescript-eslint/ban-types
  StaticMethods extends Record<string, any> = {},
> = {
  new (...args: ConstructorParameters): Instance;
} & StaticMethods;
