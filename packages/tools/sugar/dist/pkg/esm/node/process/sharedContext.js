// @ts-nocheck
import __fs from 'fs';
import __isChildProcess from '../../shared/is/isChildProcess';
import __readJsonSync from '../fs/readJsonSync';
import __writeJsonSync from '../fs/writeJsonSync';
import __systemTmpDir from '../path/systemTmpDir';
/**
 * @name            sharedContext
 * @namespace            node.process
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to access/set some context data that will be shared between main and child processes.
 *
 *
 * @param       {Object}            [data=undefined]            An object of data to set
 * @return      {Object}                                        The context object at the moment ou call the function
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __sharedContext({
 *      $1
 * })
 *
 * @example         js
 * import { __sharedContext } from '@coffeekraken/sugar/process';
 *
 * // in the main process
 * __sharedContext({
 *  something: 'cool'
 * });
 *
 * // in a child process
 * __sharedContext(); // => { something: 'cool' }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function __sharedContext(data) {
    // get the context id. Either the pid, or the ppid
    const contextId = __isChildProcess() ? process.ppid : process.pid, contextPath = `${__systemTmpDir()}/shared-context-${contextId}.json`;
    // check if we have some data
    if (data) {
        __writeJsonSync(contextPath, data);
        return data;
    }
    // otherwise, we just read the data if some are defined
    if (__fs.existsSync(contextPath)) {
        const json = __readJsonSync(contextPath);
        return json;
    }
    // otherwise, return an empty context
    return {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxnQkFBZ0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLGNBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUFDLElBQVM7SUFDN0Msa0RBQWtEO0lBQ2xELE1BQU0sU0FBUyxHQUFHLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQzdELFdBQVcsR0FBRyxHQUFHLGNBQWMsRUFBRSxtQkFBbUIsU0FBUyxPQUFPLENBQUM7SUFFekUsNkJBQTZCO0lBQzdCLElBQUksSUFBSSxFQUFFO1FBQ04sZUFBZSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsdURBQXVEO0lBQ3ZELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM5QixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELHFDQUFxQztJQUNyQyxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUMifQ==