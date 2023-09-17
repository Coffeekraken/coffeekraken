"use strict";
/**
 * @name          listDependenciesFromString
 * @namespace            shared.dependencies
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function takes a string as input, usually a javascript (js, ts) file content,
 * and returns you an array of all the dependencies found in it.
 *
 * @param       {String}        str            The string to extract dependencies from
 * @param       {IListDependenciesFromStringSettings}        [settings={}]       Some settings to configure your extraction process
 * @return      {Array<String>}                     An array of dependencies found
 *
 * @setting         {Boolean}       [jsImport=true]         Specify if you want to extract the import dependencies or not
 * @setting         {Boolean}       [jsRequire=true]        Specify if you want to extract the require dependencies or not
 *
 * @snippet         __currentModuleSystem()
 *
 * @example       js
 * import { __currentModuleSystem } from '@coffeekraken/sugar/module';
 * __currentModuleSystem(); // => 'cjs'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function __listDependenciesFromString(str, settings) {
    const es6ImportsReg = /\s?from\s?[',"](.*)[',"]/gm, es6DynamicImportsReg = /\simport\([',"](.*)[',"]\)/gm, cjsRequireReg = /\srequire\([',"](.*)[',"]\)/gm;
    const dependencies = [];
    function processDep(dep) {
        // do not take in consideration dependencies that
        // are relative to the current file
        if (dep.match(/^\./)) {
            return;
        }
        // handle organisation dependencies starting with a @
        if (dep.match(/^@/)) {
            const parts = dep.split('/');
            if (parts.length < 2) {
                return;
            }
            const d = parts.slice(0, 2).join('/');
            !dependencies.includes(d) && dependencies.push(d);
            return;
        }
        // handle normal dependencies
        const parts = dep.split('/');
        !dependencies.includes(parts[0]) && dependencies.push(parts[0]);
    }
    const es6ImportsMatches = str.matchAll(es6ImportsReg);
    for (const match of es6ImportsMatches) {
        (match === null || match === void 0 ? void 0 : match[1]) && processDep(match[1]);
    }
    const es6DynamicImportsMatches = str.matchAll(es6DynamicImportsReg);
    for (const match of es6DynamicImportsMatches) {
        (match === null || match === void 0 ? void 0 : match[1]) && processDep(match[1]);
    }
    const cjsRequireMatches = str.matchAll(cjsRequireReg);
    for (const match of cjsRequireMatches) {
        (match === null || match === void 0 ? void 0 : match[1]) && processDep(match[1]);
    }
    return dependencies;
}
exports.default = __listDependenciesFromString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7O0FBT0gsU0FBd0IsNEJBQTRCLENBQ2hELEdBQVcsRUFDWCxRQUE4QztJQUU5QyxNQUFNLGFBQWEsR0FBRyw0QkFBNEIsRUFDOUMsb0JBQW9CLEdBQUcsOEJBQThCLEVBQ3JELGFBQWEsR0FBRywrQkFBK0IsQ0FBQztJQUVwRCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFbEMsU0FBUyxVQUFVLENBQUMsR0FBVztRQUMzQixpREFBaUQ7UUFDakQsbUNBQW1DO1FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPO1NBQ1Y7UUFDRCxxREFBcUQ7UUFDckQsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbEIsT0FBTzthQUNWO1lBQ0QsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDVjtRQUNELDZCQUE2QjtRQUM3QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsS0FBSyxNQUFNLEtBQUssSUFBSSxpQkFBaUIsRUFBRTtRQUNuQyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxDQUFDLENBQUMsS0FBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNwRSxLQUFLLE1BQU0sS0FBSyxJQUFJLHdCQUF3QixFQUFFO1FBQzFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsQ0FBQyxLQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QztJQUVELE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxLQUFLLE1BQU0sS0FBSyxJQUFJLGlCQUFpQixFQUFFO1FBQ25DLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsQ0FBQyxLQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QztJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUEvQ0QsK0NBK0NDIn0=