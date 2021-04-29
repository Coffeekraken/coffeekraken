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
export default function isInScope(scope: string): boolean {
  // @ts-ignore

  if (
    // @ts-ignore
    !global._postcssSugarPluginScopeMixinScopesStack ||
    // @ts-ignore
    !global._postcssSugarPluginScopeMixinScopesStack.length
  )
    return true;

  // @ts-ignore
  const currentScopes = global._postcssSugarPluginScopeMixinScopesStack.slice(
    -1
  )[0];

  if (!currentScopes || currentScopes === '*') return true;

  if (
    currentScopes
      .split(/\s+/gm)
      .map((l) => l.trim().toLowerCase())
      .indexOf(scope.trim().toLowerCase()) !== -1
  )
    return true;

  return false;
}
