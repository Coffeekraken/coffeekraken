import __packageRoot from '../node/path/packageRoot';

export default {
  /**
   * @name           sFileClassesMap
   * @namespace       config.fs
   * @type            Record<string, string>
   *
   * Map some SFile classes path to their propers extensions like so:
   * {
   *   'scss,sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
   * }
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sFileClassesMap: {
    'js,jsx': `${__packageRoot(__dirname)}/src/node/js/SJsFile`,
    'ts,tsx': `${__packageRoot(__dirname)}/src/node/typescript/STsFile`,
    'scss,sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`,
    svelte: `${__packageRoot(__dirname)}/src/node/svelte/SSvelteFile`
  }
};
