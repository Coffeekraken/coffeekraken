import __memoizee from 'memoizee';
/**
 * @name            memoize
 * @namespace       shared.function
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform        ts
 * @status          stable
 *
 * This function can be used to memorize a function call result in order to save memory.
 * This is just a "proxy" of the "memoizee" package.
 *
 * @example         js
 * import memoize from '@coffeekraken/sugar/shared/function/memoize';
 * const fn = memoize(function(text) => {
 *    return `Hello ${text}`;
 * });
 * const result = fn('world'); // first execution. no cache
 * const result1 = fn('plop'); // first execution with this argument, no cache
 * const result2 = fn('world'); // taken from cache
 *
 * @see             https://www.npmjs.com/package/memoizee
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default __memoizee;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lbW9pemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxlQUFlLFVBQVUsQ0FBQyJ9