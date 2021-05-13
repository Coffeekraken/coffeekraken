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
export default function isInScope(scope) {
    // @ts-ignore
    if (
    // @ts-ignore
    !global._postcssSugarPluginScopeMixinScopesStack ||
        // @ts-ignore
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblNjb3BlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNJblNjb3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsS0FBYTtJQUM3QyxhQUFhO0lBRWI7SUFDRSxhQUFhO0lBQ2IsQ0FBQyxNQUFNLENBQUMsd0NBQXdDO1FBQ2hELGFBQWE7UUFDYixDQUFDLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxNQUFNO1FBRXZELE9BQU8sSUFBSSxDQUFDO0lBRWQsYUFBYTtJQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxLQUFLLENBQ3pFLENBQUMsQ0FBQyxDQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFTCxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsS0FBSyxHQUFHO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFekQsSUFDRSxhQUFhO1NBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0MsT0FBTyxJQUFJLENBQUM7SUFFZCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMifQ==