"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const fs_1 = __importDefault(require("fs"));
const isChildProcess_1 = __importDefault(require("../../shared/is/isChildProcess"));
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("../fs/writeJsonSync"));
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
function __sharedContext(data) {
    // get the context id. Either the pid, or the ppid
    const contextId = (0, isChildProcess_1.default)() ? process.ppid : process.pid, contextPath = `${(0, systemTmpDir_1.default)()}/shared-context-${contextId}.json`;
    // check if we have some data
    if (data) {
        (0, writeJsonSync_1.default)(contextPath, data);
        return data;
    }
    // otherwise, we just read the data if some are defined
    if (fs_1.default.existsSync(contextPath)) {
        const json = (0, readJsonSync_1.default)(contextPath);
        return json;
    }
    // otherwise, return an empty context
    return {};
}
exports.default = __sharedContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDRDQUFzQjtBQUN0QixvRkFBOEQ7QUFDOUQsc0VBQWdEO0FBQ2hELHdFQUFrRDtBQUNsRCx3RUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxTQUF3QixlQUFlLENBQUMsSUFBUztJQUM3QyxrREFBa0Q7SUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUM3RCxXQUFXLEdBQUcsR0FBRyxJQUFBLHNCQUFjLEdBQUUsbUJBQW1CLFNBQVMsT0FBTyxDQUFDO0lBRXpFLDZCQUE2QjtJQUM3QixJQUFJLElBQUksRUFBRTtRQUNOLElBQUEsdUJBQWUsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELHVEQUF1RDtJQUN2RCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBYyxFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxxQ0FBcUM7SUFDckMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBbkJELGtDQW1CQyJ9