
export default {
  /**
   * @name        default
   * @namespace       config.frontspec
   * @type          Object
   *
   * Specify the default frontspec file values that will be overrided by the user frontspec file ones
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: {
    /**
     * @name      assets
     * @namespace     config.frontspec.default
     * @type      Object
     * @default       [config.assets]
     *
     * Specify the default assets available in the current working directory like js, css, etc...
     *
     * @todo      Types
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    assets: '[config.assets]'
  }
};
