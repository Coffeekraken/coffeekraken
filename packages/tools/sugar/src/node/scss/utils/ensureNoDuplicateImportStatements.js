"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const findImportStatements_1 = __importDefault(require("./findImportStatements"));
const dedupe_1 = __importDefault(require("../../string/dedupe"));
/**
 * @name            ensureNoDuplicateImportStatements
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @status              beta
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureNoDuplicateImportStatements from '@coffeekraken/sugar/node/scss/utils/ensureNoDuplicateImportStatements';
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
module.exports = ensureNoDuplicateImportStatements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlTm9EdXBsaWNhdGVJbXBvcnRTdGF0ZW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlTm9EdXBsaWNhdGVJbXBvcnRTdGF0ZW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsdUVBQWlEO0FBQ2pELGtGQUE0RDtBQUM1RCxpRUFBMkM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLGlDQUFpQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5RCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxHQUFHLEVBQUUsSUFBSTtRQUNULE1BQU0sRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNGLE1BQU0sZUFBZSxHQUFHLDhCQUFzQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqRSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7UUFDdkMsTUFBTSxHQUFHLGdCQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxpQkFBUyxpQ0FBaUMsQ0FBQyJ9