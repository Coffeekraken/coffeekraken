"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../is/node"));
const delete_1 = __importDefault(require("../object/delete"));
const get_1 = __importDefault(require("../object/get"));
const set_1 = __importDefault(require("../object/set"));
const parse_1 = __importDefault(require("../string/parse"));
/**
 * @name                    env
 * @namespace            js.env
 * @type                    Function
 * @platform          js
 * @platform          node
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function env(dotPath, value) {
    if (!(0, node_1.default)()) {
        if (!window.process)
            window.process = {};
        if (!window.process.env)
            window.process.env = {};
    }
    const targetObj = (0, node_1.default)() ? global === null || global === void 0 ? void 0 : global.process.env : window.process.env;
    if (value === -1) {
        // delete the variable
        (0, delete_1.default)(targetObj, dotPath.toUpperCase());
    }
    else if (value !== undefined) {
        (0, set_1.default)(targetObj, dotPath.toUpperCase(), (0, parse_1.default)(value));
    }
    // return the variable value
    return (0, parse_1.default)((0, get_1.default)(targetObj, dotPath.toUpperCase()));
}
exports.default = env;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUFrQztBQUNsQyw4REFBd0M7QUFDeEMsd0RBQWtDO0FBQ2xDLHdEQUFrQztBQUNsQyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFNO0lBQ3hCLElBQUksQ0FBQyxJQUFBLGNBQVEsR0FBRSxFQUFFO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztZQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUNwRDtJQUNELE1BQU0sU0FBUyxHQUFHLElBQUEsY0FBUSxHQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUV4RSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLHNCQUFzQjtRQUN0QixJQUFBLGdCQUFRLEVBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQzlDO1NBQU0sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQzVCLElBQUEsYUFBSyxFQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBQSxlQUFPLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUNELDRCQUE0QjtJQUM1QixPQUFPLElBQUEsZUFBTyxFQUFDLElBQUEsYUFBSyxFQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRCxrQkFBZSxHQUFHLENBQUMifQ==