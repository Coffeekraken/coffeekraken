// @ts-nocheck
import __fs from 'fs';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RSxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sY0FBYyxNQUFNLHNCQUFzQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxJQUFTO0lBQzVCLGtEQUFrRDtJQUNsRCxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUM3RCxXQUFXLEdBQUcsR0FBRyxjQUFjLEVBQUUsbUJBQW1CLFNBQVMsT0FBTyxDQUFDO0lBRXpFLDZCQUE2QjtJQUM3QixJQUFJLElBQUksRUFBRTtRQUNOLGVBQWUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELHVEQUF1RDtJQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxxQ0FBcUM7SUFDckMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==