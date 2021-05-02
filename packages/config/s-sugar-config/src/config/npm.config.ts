import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default {
  /**
   * @name            rootDir
   * @namespace       sugar.config.npm
   * @type            String
   * @default         `${__packageRoot()}/node_modules`
   *
   * Specify the "node_modules" directory path
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot()}/node_modules`
};
