/* eslint-disable @typescript-eslint/no-explicit-any */
type PathOptions<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathOptions<T[Key], Exclude<keyof T[Key], keyof any[]>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type PathOptionsOrKey<T> = PathOptions<T, keyof T> | keyof T;

type OptionalField<T, Key> =
  | PathValue<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type IndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? '0' extends keyof T
    ? undefined
    : number extends keyof T
    ? T[number]
    : undefined
  : undefined;

/**
 * It defines the union of paths within an object in dot notation form.
 */
export type PathsOf<T> = PathOptionsOrKey<T> extends string | keyof T
  ? PathOptionsOrKey<T>
  : keyof T;

/**
 * It retrieves the value within an object based on a dot notation path.
 */
export type PathValue<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? OptionalField<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? OptionalField<
          | IndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
          | Extract<T[FieldKey], undefined>,
          Right
        >
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ?
        | IndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
        | Extract<T[FieldKey], undefined>
    : undefined
  : undefined;
