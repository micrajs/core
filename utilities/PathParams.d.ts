/**
 * It defines the path's parameter options.
 * - PathSeparator: defines the character that separates segments of a path definition
 * - VariableStart: defines the character which identifies the start of a variable
 * - VariableEnd: defines the character which identifies the end of a variable
 * - VariableEnumStart: defines the character which identifies the start of an enum section
 * - VariableEnumEnd: defines the character which identifies the end of an enum section
 * - VariableEnumSeparator: defines the character which separates enums within the enum section
 * - VariableOptionalIdentifier: defines the character which identifies if a given variable is optional
 *
 * @example
 * ```ts
 * // /:param(op1|op2)/:optional?
 * type RoutePathOptions = PathOptions<'/', ':', '', '(', ')', '|', '?'>;
 *
 * // {param(op1,op2)} {optional}?
 * type CLIOptions = PathOptions<' ', '{', '}', '(', ')', ',', '?'>;
 * ```
 */
export interface PathOptions<
  PathSeparator extends string = string,
  VariableStart extends string = string,
  VariableEnd extends string = string,
  VariableEnumStart extends string = string,
  VariableEnumEnd extends string = string,
  VariableEnumSeparator extends string = string,
  VariableOptionalIdentifier extends string = string,
> {
  PATH_SEPARATOR: PathSeparator;
  VARIABLE_START: VariableStart;
  VARIABLE_END: VariableEnd;
  VARIABLE_ENUM_START: VariableEnumStart;
  VARIABLE_ENUM_END: VariableEnumEnd;
  VARIABLE_ENUM_SEPARATOR: VariableEnumSeparator;
  VARIABLE_OPTIONAL_IDENTIFIER: VariableOptionalIdentifier;
}

type GetEnumOptions<
  T extends string,
  Options extends PathOptions = PathOptions,
> = string extends T
  ? string
  : T extends `${infer Start}${Options['VARIABLE_ENUM_SEPARATOR']}${infer Rest}`
  ? Start | GetEnumOptions<Rest, Options>
  : T;

/**
 * It parses a path's parameters.
 */
export type PathParams<
  Path extends string,
  Options extends PathOptions,
> = string extends Path
  ? Record<string, string>
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['VARIABLE_ENUM_START']}${infer EnumOptions}${Options['VARIABLE_ENUM_END']}${Options['VARIABLE_OPTIONAL_IDENTIFIER']}${Options['PATH_SEPARATOR']}${infer Rest}`
  ? {
      [K in Param]?: GetEnumOptions<EnumOptions, Options>;
    } & PathParams<Rest, Options>
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['VARIABLE_ENUM_START']}${infer EnumOptions}${Options['VARIABLE_ENUM_END']}${Options['PATH_SEPARATOR']}${infer Rest}`
  ? {
      [K in Param]: GetEnumOptions<EnumOptions, Options>;
    } & PathParams<Rest, Options>
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['VARIABLE_OPTIONAL_IDENTIFIER']}${Options['PATH_SEPARATOR']}${infer Rest}`
  ? {[K in Param]?: string} & PathParams<Rest, Options>
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['PATH_SEPARATOR']}${infer Rest}`
  ? {[K in Param]: string} & PathParams<Rest, Options>
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['VARIABLE_ENUM_START']}${infer EnumOptions}${Options['VARIABLE_ENUM_END']}${Options['VARIABLE_OPTIONAL_IDENTIFIER']}`
  ? {[k in Param]?: GetEnumOptions<EnumOptions, Options>}
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['VARIABLE_ENUM_START']}${infer EnumOptions}${Options['VARIABLE_ENUM_END']}`
  ? {[k in Param]: GetEnumOptions<EnumOptions, Options>}
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}${Options['VARIABLE_OPTIONAL_IDENTIFIER']}`
  ? {[k in Param]?: string}
  : Path extends `${infer _}${Options['VARIABLE_START']}${infer Param}${Options['VARIABLE_END']}`
  ? {[k in Param]: string}
  : Record<string, unknown>;
