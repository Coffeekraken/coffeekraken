"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
/**
 * @name            findImportStatements
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @status              beta
 *
 * This function simply parse the passed string to extract all the @import and @use statements
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
 * import findImportStatements from '@coffeekraken/sugar/node/scss/utils/findImportStatements';
 * findImportStatements(`
 *    @use 'something/cool' as Hello;
 *    @import 'other/cool/thing';
 * `);
 * // [{
 * //   type: 'use',
 * //   path: 'something/cool',
 * //   as: 'Hello'
 * // }, {
 * //   type: 'import',
 * //   path: 'other/cool/thing'
 * // }]
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function findImportStatements(string, settings = {}) {
    settings = deepMerge_1.default({
        use: true,
        import: true
    }, settings);
    // split lines
    const lines = string.split('\n');
    const reg = /^(\s+)?@(use|import)\s*['"](.*?)['"](\sas\s([a-zA-Z0-9-_]+))?/g;
    const statements = [];
    // loop on each lines
    lines.forEach((line, index) => {
        const matches = line.match(reg);
        if (!matches)
            return;
        matches.forEach((match) => {
            match = match.trim();
            const statementObj = {
                raw: match + ';'
            };
            if (match.match(/^@import\s/)) {
                statementObj.type = 'import';
            }
            else {
                statementObj.type = 'use';
            }
            match = match.replace(/^@import\s/, '').replace(/^@use\s/, '');
            if (statementObj.type === 'use' && match.match(/\sas\s/)) {
                const parts = match.split(' as ');
                statementObj.path = parts[0];
                statementObj.as = parts[1];
            }
            else {
                statementObj.path = match;
            }
            statementObj.line = index;
            statementObj.path = statementObj.path.slice(1, -1);
            if (settings.use && statementObj.type === 'use') {
                statements.push(statementObj);
            }
            else if (settings.import && statementObj.type === 'import') {
                statements.push(statementObj);
            }
        });
    });
    return statements;
}
exports.default = findImportStatements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEltcG9ydFN0YXRlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kSW1wb3J0U3RhdGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx1RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILFNBQVMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2pELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLEdBQUcsRUFBRSxJQUFJO1FBQ1QsTUFBTSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsY0FBYztJQUNkLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFakMsTUFBTSxHQUFHLEdBQUcsZ0VBQWdFLENBQUM7SUFFN0UsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXRCLHFCQUFxQjtJQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4QixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLE1BQU0sWUFBWSxHQUFHO2dCQUNuQixHQUFHLEVBQUUsS0FBSyxHQUFHLEdBQUc7YUFDakIsQ0FBQztZQUNGLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDN0IsWUFBWSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFDRCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvRCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLFlBQVksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixZQUFZLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUMzQjtZQUNELFlBQVksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBRTFCLFlBQVksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkQsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUMvQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQy9CO2lCQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUQsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsb0JBQW9CLENBQUMifQ==