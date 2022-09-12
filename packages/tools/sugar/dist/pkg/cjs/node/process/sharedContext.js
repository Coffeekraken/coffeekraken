"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const path_1 = require("@coffeekraken/sugar/path");
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
    const contextId = (0, is_1.__isChildProcess)() ? process.ppid : process.pid, contextPath = `${(0, path_1.__systemTmpDir)()}/shared-context-${contextId}.json`;
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
exports.default = __sharedContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDRDQUFzQjtBQUN0QiwrQ0FBeUU7QUFDekUsK0NBQTBEO0FBQzFELG1EQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsU0FBd0IsZUFBZSxDQUFDLElBQVM7SUFDN0Msa0RBQWtEO0lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUEscUJBQWdCLEdBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDN0QsV0FBVyxHQUFHLEdBQUcsSUFBQSxxQkFBYyxHQUFFLG1CQUFtQixTQUFTLE9BQU8sQ0FBQztJQUV6RSw2QkFBNkI7SUFDN0IsSUFBSSxJQUFJLEVBQUU7UUFDTixJQUFBLG9CQUFlLEVBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCx1REFBdUQ7SUFDdkQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUEsbUJBQWMsRUFBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQscUNBQXFDO0lBQ3JDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQW5CRCxrQ0FtQkMifQ==