"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            isInScope
 * @namespace       node.utils
 * @type            Function
 *
 * This function allows you to pass either a string like "*", "color", etc... or
 * an array of string like ['color','size'] and you will bet back a simple
 * boolean that let you know if the current code execution is in the
 * requested scope specified by the use of the ```@sugar.scope``` mixin directly in your css
 *
 * @param       {String}       scope                A scope name to check if the current code is in it or not
 * @return      {Boolean}                           true if the code is in the passed scope, false if not
 *
 * @example         js
 * import { isInScope } from '@coffeekraken/s-postcss-sugar-plugin';
 * isInScope('color'); // => true
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInScope(scope) {
    // @ts-ignore
    if (!global._postcssSugarPluginScopeMixinScopesStack)
        return true;
    // @ts-ignore
    const currentScopes = global._postcssSugarPluginScopeMixinScopesStack.slice(-1)[0];
    if (!currentScopes || currentScopes === '*')
        return true;
    if (currentScopes
        .split(/\s+/gm)
        .map((l) => l.trim().toLowerCase())
        .indexOf(scope.trim().toLowerCase()) !== -1)
        return true;
    return false;
}
exports.default = isInScope;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblNjb3BlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNJblNjb3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUF3QixTQUFTLENBQUMsS0FBYTtJQUM3QyxhQUFhO0lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3Q0FBd0M7UUFBRSxPQUFPLElBQUksQ0FBQztJQUVsRSxhQUFhO0lBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLHdDQUF3QyxDQUFDLEtBQUssQ0FDekUsQ0FBQyxDQUFDLENBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVMLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxLQUFLLEdBQUc7UUFBRSxPQUFPLElBQUksQ0FBQztJQUV6RCxJQUNFLGFBQWE7U0FDVixLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQztJQUVkLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQXBCRCw0QkFvQkMifQ==