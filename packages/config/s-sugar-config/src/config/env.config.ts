if (global && !global.window) global.window = {};

export default {
  /**
   * @name            env
   * @type            String
   * @namespace       config.env
   * @default         process.env.NODE_ENV ?? window.env.ENV ?? 'development`
   *
   * Specify the environment env. This is usually "production" or "development" as value.
   *
   * @since           2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // @ts-ignore
  env: process?.env?.NODE_ENV ?? window?.env?.ENV ?? 'development'
};
