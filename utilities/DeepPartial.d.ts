/**
 * It defines the partial version of deeply nested objects.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: Partial<T[P]> | DeepPartial<T[P]>;
};
