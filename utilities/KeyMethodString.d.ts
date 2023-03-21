/**
 * It resolves the paths of a given type within a given object. This goes one level deep using the dot notation.
 *
 * @typeParam `Needle` - The type to look for in the object.
 * @typeParam `Haystack` - The object to look for the type in.
 * @typeParam `Key` - The keys of the object to look for the type in. Inferred from the Haystack type.
 * @typeParam `ShouldContinue` - Variable determining rather or not to go to the next level of the object.
 */
export type KeyMethodString<
  Needle,
  Haystack,
  Key extends keyof Haystack,
  ShouldContinue = true,
> = Key extends string
  ? Haystack[Key] extends Needle
    ? `${Key}`
    : Haystack[Key] extends Record<string, any>
    ? ShouldContinue extends true
      ? `${Key}.${KeyMethodString<
          Needle,
          Haystack[Key],
          keyof Haystack[Key],
          false
        >}`
      : never
    : never
  : never;
