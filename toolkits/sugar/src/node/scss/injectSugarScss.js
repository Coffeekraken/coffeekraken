const __sugarConfig = require('../config/sugar');
const __jsObjectToScssMap = require('./jsObjectToScssMap');
const __putUseStatementsOnTop = require('./putUseStatementsOnTop');
const __packageRoot = require('../path/packageRoot');
const __isInPackage = require('../is/inPackage');
const __path = require('path');

/**
 * @name            injectSugarScss
 * @namespace       sugar.node.scss
 * @type            Function
 *
 * This function simply inject the sugar scss init code in a string.
 * It check if it has already been injected and does nothing if it's the case.
 *
 * @param       {String}          scss          The scss string in which to inject the init code
 * @return      {String}                        The new string with the sugar scss init code injected
 *
 * @example       js
 * const injectSugarScss = require('@coffeekraken/sugar/node/scss/injectSugarScss');
 * injectSugarScss(``
 *    body {
 *      color: Sugar.color('primary');
 *    }
 * `);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function injectSugarScss(scss) {
  if (scss.includes(' as Sugar;')) return scss;

  const scssSettings = __sugarConfig('scss');
  const settingsString = __jsObjectToScssMap(scssSettings);
  const path = __isInPackage('coffeekraken', process.cwd(), true)
    ? __path.resolve(__packageRoot(__dirname, true), 'toolkits/sugar/index')
    : '@coffeekraken/sugar/index';
  const importsStrings = `
      @use "${path}" as Sugar;
      $sugarUserSettings: ${settingsString};
      @include Sugar.setup($sugarUserSettings);
    `;

  const res = __putUseStatementsOnTop(`
    ${importsStrings}
    ${scss}
  `);

  return res;
};
