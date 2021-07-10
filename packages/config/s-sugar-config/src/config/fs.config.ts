import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default {
  /**
   * @name           sFileClassesMap
   * @namespace       config.fs
   * @type            Record<string, string>
   *
   * Map some SFile classes path using minimatch patterns like so:
   * {
   *   '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
   * }
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sFileClassesMap: {
    'tsconfig.*': `${__packageRoot(__dirname())}/src/node/ts/STsconfigFile`,
    '*.js,*.jsx': `${__packageRoot(__dirname())}/src/node/js/SJsFile`,
    '*.ts,*.tsx': `${__packageRoot(__dirname())}/src/node/typescript/STsFile`,
    '*.scss,*.sass': `${__packageRoot(__dirname())}/src/node/scss/SScssFile`,
    '*.svelte': `${__packageRoot(__dirname())}/src/node/svelte/SSvelteFile`
  }
};
