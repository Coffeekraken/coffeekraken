"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const fs_1 = __importDefault(require("fs"));
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("../fs/writeJsonSync"));
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
exports.default = sharedContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDRDQUFzQjtBQUN0QixzRUFBZ0Q7QUFDaEQsd0VBQWtEO0FBQ2xELHNFQUFrRDtBQUNsRCx3RUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQVMsYUFBYSxDQUFDLElBQVM7SUFDNUIsa0RBQWtEO0lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUEsc0JBQWdCLEdBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDN0QsV0FBVyxHQUFHLEdBQUcsSUFBQSxzQkFBYyxHQUFFLG1CQUFtQixTQUFTLE9BQU8sQ0FBQztJQUV6RSw2QkFBNkI7SUFDN0IsSUFBSSxJQUFJLEVBQUU7UUFDTixJQUFBLHVCQUFlLEVBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCx1REFBdUQ7SUFDdkQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQscUNBQXFDO0lBQ3JDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUNELGtCQUFlLGFBQWEsQ0FBQyJ9