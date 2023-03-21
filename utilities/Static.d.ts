/* eslint-disable @typescript-eslint/ban-types */
import {Constructor} from './Constructor';

/**
 * It defines the type for a static class, allowing the definition of constructor parameters and static methods.
 * @deprecated use Constructor
 */
export type Static<
  Instance = unknown,
  ConstructorParameters extends Array<unknown> = [],
  StaticMethods extends Record<string, any> = {},
> = Constructor<Instance, ConstructorParameters, StaticMethods>;
