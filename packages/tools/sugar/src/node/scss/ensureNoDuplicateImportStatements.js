"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const findImportStatements_1 = __importDefault(require("./findImportStatements"));
const dedupe_1 = __importDefault(require("../string/dedupe"));
/**
 * @name            ensureNoDuplicateImportStatements
 * @namespace       sugar.node.scss
 * @type            Function
 *
 * This function simply parse the passed string and make sure their's no duplicate import and use statements
 *
 * @param       {String}          string          The string to parse
 * @param       {Object}        [settings={}]     An object of settings to configure your parsing
 * @return      {Array<Object>}                   An array of object describing each founded statements
 *
 * @setting      {Boolean}       [use=true]      Specify if you want to extract the @use statements
 * @setting      {Boolean}      [imports=true]    Specify if you want to extract the @import statements
 *
 * @example       js
 * import ensureNoDuplicateImportStatements from '@coffeekraken/sugar/node/scss/ensureNoDuplicateImportStatements';
 * ensureNoDuplicateImportStatements(`
 *    @use 'something/cool' as Hello;
 *    @import 'other/cool/thing';
 *    @use 'something/cool' as Hello;
 * `);
 * // @use 'something/cool' as Hello;
 * // @import 'other/cool/thing';
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureNoDuplicateImportStatements(string, settings = {}) {
    settings = deepMerge_1.default({
        use: true,
        import: true
    }, settings);
    const statementsArray = findImportStatements_1.default(string, settings);
    statementsArray.forEach((statementObj) => {
        string = dedupe_1.default(string, statementObj.raw);
    });
    return string;
}
exports.default = ensureNoDuplicateImportStatements;
