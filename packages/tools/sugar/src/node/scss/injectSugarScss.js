"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../config/sugar"));
const jsObjectToScssMap_1 = __importDefault(require("./jsObjectToScssMap"));
const putUseStatementsOnTop_1 = __importDefault(require("./putUseStatementsOnTop"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const inPackage_1 = __importDefault(require("../is/inPackage"));
const path_1 = __importDefault(require("path"));
/**
 * @name            injectSugarScss
 * @namespace       sugar.node.scss
 * @type            Function
 * @wip
 *
 * This function simply inject the sugar scss init code in a string.
 * It check if it has already been injected and does nothing if it's the case.
 *
 * @param       {String}          scss          The scss string in which to inject the init code
 * @return      {String}                        The new string with the sugar scss init code injected
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import injectSugarScss from '@coffeekraken/sugar/node/scss/injectSugarScss';
 * injectSugarScss(``
 *    body {
 *      color: Sugar.color('primary');
 *    }
 * `);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function injectSugarScss(scss) {
    if (scss.includes(' as Sugar;'))
        return scss;
    const scssSettings = sugar_1.default('scss');
    const settingsString = jsObjectToScssMap_1.default(scssSettings);
    const path = inPackage_1.default('coffeekraken', process.cwd(), true)
        ? path_1.default.resolve(packageRoot_1.default(__dirname, true), 'toolkits/sugar/index')
        : '@coffeekraken/sugar/index';
    const importsStrings = `
      @use "${path}" as Sugar;
      $sugarUserSettings: ${settingsString};
      @include Sugar.setup($sugarUserSettings);
    `;
    const res = putUseStatementsOnTop_1.default(`
    ${importsStrings}
    ${scss}
  `);
    return res;
}
module.exports = injectSugarScss;
//# sourceMappingURL=injectSugarScss.js.map