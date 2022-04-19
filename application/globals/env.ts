declare global {
  namespace Micra {
    /**
     * Global helper that retrieves an environment variable from one of the registered environment providers.
     */
    interface Env {
      /**
       * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns undefined.
       *
       * @param key - The key of the environment variable.
       * @returns The environment variable value or undefined.
       *
       * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
       */
      <Key extends keyof Application.EnvironmentVariables>(key: Key):
        | Application.EnvironmentVariables[Key]
        | undefined;
      /**
       * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns a given fallback.
       *
       * @param key - The key of the environment variable.
       * @param fallback - The fallback value of type defined by the Application.EnvironmentVariables[Key].
       * @returns The environment variable value or the given fallback.
       *
       * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
       */
      <Key extends keyof Application.EnvironmentVariables>(
        key: Key,
        fallback: Application.EnvironmentVariables[Key],
      ): Application.EnvironmentVariables[Key];
      <Key extends keyof Application.EnvironmentVariables>(
        key: Key,
        fallback?: Application.EnvironmentVariables[Key],
      ): Application.EnvironmentVariables[Key] | undefined;
    }
  }

  /**
   * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns undefined or a given fallback.
   *
   * @param key - The key of the environment variable.
   * @param fallback - (optional) The fallback value of type defined by the Application.EnvironmentVariables[Key].
   * @returns The environment variable value or the given fallback.
   *
   * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
   */
  const env: Micra.Env;

  interface Window {
    /**
     * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns undefined or a given fallback.
     *
     * @param key - The key of the environment variable.
     * @param fallback - (optional) The fallback value of type defined by the Application.EnvironmentVariables[Key].
     * @returns The environment variable value or the given fallback.
     *
     * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
     */
    env: Micra.Env;
  }

  namespace NodeJS {
    interface Global {
      /**
       * Global helper that retrieves an environment variable from one of the registered environment providers. If the environment variable is not registered, it returns undefined or a given fallback.
       *
       * @param key - The key of the environment variable.
       * @param fallback - (optional) The fallback value of type defined by the Application.EnvironmentVariables[Key].
       * @returns The environment variable value or the given fallback.
       *
       * @typeParam `Key` - The key of the environment variable defined in the Application.EnvironmentVariables interface. Inferred from the `key` parameter.
       */
      env: Micra.Env;
    }
  }
}

export {};
