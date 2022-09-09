"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("@coffeekraken/sugar/fs");
const childProcess_1 = __importDefault(require("../is/childProcess"));
const systemTmpDir_1 = __importDefault(require("../path/systemTmpDir"));
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
    const contextId = (0, childProcess_1.default)() ? process.ppid : process.pid, contextPath = `${(0, systemTmpDir_1.default)()}/shared-context-${contextId}.json`;
    // check if we have some data
    if (data) {
        (0, fs_2.__writeJsonSync)(contextPath, data);
        return data;
    }
    // otherwise, we just read the data if some are defined
    if (fs_1.default.existsSync(contextPath)) {
        const json = (0, fs_2.__readJsonSync)(contextPath);
        return json;
    }
    // otherwise, return an empty context
    return {};
}
exports.default = sharedContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDRDQUFzQjtBQUN0QiwrQ0FBeUU7QUFDekUsc0VBQWtEO0FBQ2xELHdFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBUztJQUM1QixrREFBa0Q7SUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBQSxzQkFBZ0IsR0FBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUM3RCxXQUFXLEdBQUcsR0FBRyxJQUFBLHNCQUFjLEdBQUUsbUJBQW1CLFNBQVMsT0FBTyxDQUFDO0lBRXpFLDZCQUE2QjtJQUM3QixJQUFJLElBQUksRUFBRTtRQUNOLElBQUEsb0JBQWUsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELHVEQUF1RDtJQUN2RCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBYyxFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxxQ0FBcUM7SUFDckMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=