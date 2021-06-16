// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            excludeGlobs
 * @namespace            node.path
 * @type                            Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjbHVkZUdsb2JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhjbHVkZUdsb2JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxNQUFNLENBQUMsT0FBTztJQUNaLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMxRCxPQUFPLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLEVBQUUsQ0FBQztBQUM1QixDQUFDIn0=