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
    if (!global._postcssSugarPluginScopeMixinScopesStack ||
        !global._postcssSugarPluginScopeMixinScopesStack.length)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblNjb3BlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNJblNjb3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUF3QixTQUFTLENBQUMsS0FBYTtJQUM3QyxhQUFhO0lBRWIsSUFDRSxDQUFDLE1BQU0sQ0FBQyx3Q0FBd0M7UUFDaEQsQ0FBQyxNQUFNLENBQUMsd0NBQXdDLENBQUMsTUFBTTtRQUV2RCxPQUFPLElBQUksQ0FBQztJQUVkLGFBQWE7SUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsd0NBQXdDLENBQUMsS0FBSyxDQUN6RSxDQUFDLENBQUMsQ0FDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLEtBQUssR0FBRztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXpELElBQ0UsYUFBYTtTQUNWLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLE9BQU8sSUFBSSxDQUFDO0lBRWQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBekJELDRCQXlCQyJ9