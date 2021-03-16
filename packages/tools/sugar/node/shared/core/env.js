"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../is/node"));
const get_1 = __importDefault(require("../object/get"));
const set_1 = __importDefault(require("../object/set"));
const delete_1 = __importDefault(require("../object/delete"));
const parse_1 = __importDefault(require("../string/parse"));
/**
 * @name                    env
 * @namespace           sugar.js.core
 * @type                    Function
 * @status              wip
 *
 * This function allows you to access environment variables through the same method in node and javascript
 *
 * @param           {String}          dotPath         The dot path (something.else) to tell which variable you want
 * @param           {Mixed}           [value=null]    The value you want to assign. If null, you will just get the wanted variable back
 * @return          {Mixed}                           The variable value
 *
 * @todo        interface
 * @todo        doc
 *
 * @example         js
 * import env from '@coffeekraken/sugar/js/dev/env';
 * console.log(env('node_env')); // => production
 * env('something.cool', { hello: 'world' });
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function env(dotPath, value) {
    if (!node_1.default()) {
        if (!window.process)
            window.process = {};
        if (!window.process.env)
            window.process.env = {};
    }
    const targetObj = node_1.default() ? global.process.env : window.process.env;
    if (value === null) {
        // delete the variable
        delete_1.default(targetObj, dotPath.toUpperCase());
    }
    else if (value !== undefined) {
        set_1.default(targetObj, dotPath.toUpperCase(), parse_1.default(value));
    }
    // return the variable value
    return parse_1.default(get_1.default(targetObj, dotPath.toUpperCase()));
}
exports.default = env;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb3JlL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsc0RBQWtDO0FBQ2xDLHdEQUFrQztBQUNsQyx3REFBa0M7QUFDbEMsOERBQXdDO0FBQ3hDLDREQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLO0lBQ3pCLElBQUksQ0FBQyxjQUFRLEVBQUUsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7WUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7S0FDbEQ7SUFDRCxNQUFNLFNBQVMsR0FBRyxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBRXZFLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUNsQixzQkFBc0I7UUFDdEIsZ0JBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDOUIsYUFBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsZUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCw0QkFBNEI7SUFDNUIsT0FBTyxlQUFPLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxrQkFBZSxHQUFHLENBQUMifQ==