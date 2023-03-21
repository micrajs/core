/* eslint-disable @typescript-eslint/ban-types */
import type {Constructor} from './Constructor';

/**
 * It allows you to pass an instance or a constructor.
 */
export type MaybeInstanceOf<
  Instance = unknown,
  Params extends Array<unknown> = [],
  StaticMethods extends Record<string, any> = {},
> = Instance | Constructor<Instance, Params, StaticMethods>;
