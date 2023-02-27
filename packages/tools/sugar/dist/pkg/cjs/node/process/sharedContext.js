"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
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
    const contextId = (0, is_1.__isChildProcess)() ? process.ppid : process.pid, contextPath = `${(0, path_1.__systemTmpDir)()}/shared-context-${contextId}.json`;
    // check if we have some data
    if (data) {
        (0, fs_1.__writeJsonSync)(contextPath, data);
        return data;
    }
    // otherwise, we just read the data if some are defined
    if (fs_2.default.existsSync(contextPath)) {
        const json = (0, fs_1.__readJsonSync)(contextPath);
        return json;
    }
    // otherwise, return an empty context
    return {};
}
exports.default = __sharedContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLCtDQUF5RTtBQUN6RSwrQ0FBMEQ7QUFDMUQsbURBQTBEO0FBQzFELDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQXdCLGVBQWUsQ0FBQyxJQUFTO0lBQzdDLGtEQUFrRDtJQUNsRCxNQUFNLFNBQVMsR0FBRyxJQUFBLHFCQUFnQixHQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQzdELFdBQVcsR0FBRyxHQUFHLElBQUEscUJBQWMsR0FBRSxtQkFBbUIsU0FBUyxPQUFPLENBQUM7SUFFekUsNkJBQTZCO0lBQzdCLElBQUksSUFBSSxFQUFFO1FBQ04sSUFBQSxvQkFBZSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsdURBQXVEO0lBQ3ZELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM5QixNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFjLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELHFDQUFxQztJQUNyQyxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFuQkQsa0NBbUJDIn0=