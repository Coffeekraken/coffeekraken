// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            excludeGlobs
 * @namespace            node.path
 * @type                            Function
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
    if (__SugarConfig.isLoaded()) {
        return __SugarConfig.get('storage.exclude');
    }
    return [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjbHVkZUdsb2JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhjbHVkZUdsb2JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU87SUFDVixJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUMxQixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUMvQztJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyJ9