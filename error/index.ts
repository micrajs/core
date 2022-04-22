import '@/namespaces';

type GlobalError = Error;

declare global {
  namespace Micra {
    /**
     * This interface describes the details of an error. This structure can be used as a standard method of communication between applications, such as API and cross layer responses.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7807/
     */
    interface ErrorMessage {
      /**
       * A human-readable explanation specific to this occurrence of the problem.
       */
      detail?: string;

      /**
       * An optional object containing more specific information about the error.
       */
      extras?: Record<string, any>;

      /**
       * A URI reference that identifies the specific occurrence of the problem. It may or may not yield further information if dereferenced.
       */
      instance?: string;

      /**
       * The HTTP status code generated by the origin server for this occurrence of the problem.
       */
      status: number;

      /**
       * A short, human-readable summary of the problem type. It SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization (e.g. using proactive content negotiation)
       */
      title: string;

      /**
       * A URI reference that identifies the problem type. This specification encourages that, when dereferenced, it provide human-readable documentation for the problem type (e.g., using HTML). When this member is not present, its value is assumed to be "about:blank".
       */
      type?: string;
    }

    /**
     * This interface describes the standard error class that can be thrown by the framework.
     */
    interface Error extends GlobalError {
      /**
       * The HTTP status code generated by the origin server for this occurrence of the problem.
       */
      statusCode: number;

      /**
       * Method used to serialize the errors to a list of JSON objects.
       */
      serialize(): ErrorMessage[];
    }

    /**
     * This interface describes the standard validation error class that can be thrown by the framework.
     */
    interface ValidationError<Fields extends string> extends Error {
      /**
       * The HyperText Transfer Protocol (HTTP) 422 Unprocessable Entity response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
       */
      statusCode: 422;

      /**
       * Checks if there are any validation errors.
       *
       * @returns `true` if there are validation errors, otherwise `false`.
       */
      hasAny(): boolean;

      /**
       * Checks if there are any validation errors for a given field.
       *
       * @param field - The field to check.
       * @returns `true` if there are validation errors for the given field, otherwise `false`.
       */
      has(field: Fields): boolean;

      /**
       * Returns the validation errors for a given field.
       *
       * @param field - The field to check.
       * @returns The validation errors for the given field if there are no validation errors or the field doesn't exist.
       *
       * @typeParam `Field` - The field to check. Inferred from the `field` parameter type.
       */
      get<Field extends Fields>(field: Field): ValidationErrorExtras<Field>[];

      /**
       * Defines the validation errors for a given field.
       *
       * @param field - The field to check.
       * @param extras - The extras to be added to the validation error.
       * @returns The ValidationError instance.
       *
       * @typeParam `Field` - The field to check. Inferred from the `field` parameter type.
       */
      set<Field extends Fields>(
        field: Field,
        extras: Omit<ValidationErrorExtras<Field>, 'field'>,
      ): this;
    }

    /**
     * It describes the extra information that can be attached to a validation error message.
     * This is used to provide additional information to the user and is serialized
     * as the `extra` property of the error message.
     */
    interface ValidationErrorExtras<Fields extends string> {
      /**
       * The field that caused the error.
       */
      field: Fields;

      /**
       * The error message.
       */
      message: string;

      /**
       * Optional extra information.
       */
      variables?: Record<string, unknown>;
    }
  }
}

export {};
