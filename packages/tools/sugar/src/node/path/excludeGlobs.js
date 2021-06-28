// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            excludeGlobs
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Return the array of exclude globs
 *
 * @return                {Array<String>}         The array of globs to exclude from the overall project
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import excludeGlobs from '@coffeekraken/node/fs/excludeGlobs';
 * excludeGlobs();
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function () {
    const excludeGlobs = __SugarConfig.get('storage.exclude');
    return excludeGlobs !== null && excludeGlobs !== void 0 ? excludeGlobs : [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjbHVkZUdsb2JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhjbHVkZUdsb2JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUdILE1BQU0sQ0FBQyxPQUFPO0lBQ1osTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFELE9BQU8sWUFBWSxhQUFaLFlBQVksY0FBWixZQUFZLEdBQUksRUFBRSxDQUFDO0FBQzVCLENBQUMifQ==