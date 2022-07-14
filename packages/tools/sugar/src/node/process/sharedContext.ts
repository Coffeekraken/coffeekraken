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
function sharedContext(data: any): any {
    // get the context id. Either the pid, or the ppid
    const contextId = __isChildProcess() ? process.ppid : process.pid,
        contextPath = `${__systemTmpDir()}/shared-context-${contextId}.json`;

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
