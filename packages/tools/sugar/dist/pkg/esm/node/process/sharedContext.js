// @ts-nocheck
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';
import __writeJsonSync from '../fs/writeJsonSync';
import __isChildProcess from '../is/childProcess';
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
 * @example         js
 * import sharedContext from '@coffeekraken/sugar/node/process/sharedContext';
 *
 * // in the main process
 * sharedContext({
 *  something: 'cool'
 * });
 *
 * // in a child process
 * sharedContet(); // => { something: 'cool' }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function sharedContext(data) {
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
export default sharedContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLGNBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBUztJQUM1QixrREFBa0Q7SUFDbEQsTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDN0QsV0FBVyxHQUFHLEdBQUcsY0FBYyxFQUFFLG1CQUFtQixTQUFTLE9BQU8sQ0FBQztJQUV6RSw2QkFBNkI7SUFDN0IsSUFBSSxJQUFJLEVBQUU7UUFDTixlQUFlLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCx1REFBdUQ7SUFDdkQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQscUNBQXFDO0lBQ3JDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUNELGVBQWUsYUFBYSxDQUFDIn0=