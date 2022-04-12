export type DeepPartial<T> = {
  [P in keyof T]?: Partial<T[P]> | DeepPartial<T[P]>;
};
