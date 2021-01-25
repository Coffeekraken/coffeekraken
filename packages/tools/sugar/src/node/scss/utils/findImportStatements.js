"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
/**
 * @name            findImportStatements
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @beta
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
module.exports = findImportStatements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEltcG9ydFN0YXRlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kSW1wb3J0U3RhdGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLHVFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDakQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsR0FBRyxFQUFFLElBQUk7UUFDVCxNQUFNLEVBQUUsSUFBSTtLQUNiLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixjQUFjO0lBQ2QsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqQyxNQUFNLEdBQUcsR0FBRyxnRUFBZ0UsQ0FBQztJQUU3RSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFdEIscUJBQXFCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsTUFBTSxZQUFZLEdBQUc7Z0JBQ25CLEdBQUcsRUFBRSxLQUFLLEdBQUcsR0FBRzthQUNqQixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUM3QixZQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUMzQjtZQUNELEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDeEQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLFlBQVksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQzNCO1lBQ0QsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFFMUIsWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQy9DLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1RCxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFDRCxpQkFBUyxvQkFBb0IsQ0FBQyJ9