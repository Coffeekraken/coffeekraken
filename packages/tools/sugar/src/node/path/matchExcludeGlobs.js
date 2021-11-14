// @ts-nocheck
import __minimatch from 'minimatch';
import __excludeGlobs from './excludeGlobs';
/**
 * @name                    matchExcludeGlobs
 * @namespace            node.path
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed path match one or more exclude globs specified in the config "storage.exclude"
 *
 * @param           {String}            path            The path to check
 * @return          {Boolean}                           true if the path match at least 1 exclude glob, false if not
 *
 * @example         js
 * import matchExcludeGlobs from '@coffeekraken/sugar/node/path/matchExcludeGlobs';
 * if (matchExcludeGlobs('something/cool.js')) {
 *      // ...
 * }
 *
 * @see             https://www.npmjs.com/package/minimatch
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function matchExcludeGlobs(path) {
    const excludeGlobs = __excludeGlobs();
    for (let i = 0; i < excludeGlobs.length; i++) {
        if (__minimatch(excludeGlobs[i], path))
            return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hFeGNsdWRlR2xvYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRjaEV4Y2x1ZGVHbG9icy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUFDLElBQVk7SUFDbEQsTUFBTSxZQUFZLEdBQUcsY0FBYyxFQUFFLENBQUM7SUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ3ZEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9