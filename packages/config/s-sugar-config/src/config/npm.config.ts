import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';

export default {
  /**
   * @name            rootDir
   * @namespace       sugar.config.npm
   * @type            String
   * @default         `${__packageRootDir()}/node_modules`
   *
   * Specify the "node_modules" directory path
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRootDir()}/node_modules`
};
