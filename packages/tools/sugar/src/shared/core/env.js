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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixzREFBa0M7QUFDbEMsd0RBQWtDO0FBQ2xDLHdEQUFrQztBQUNsQyw4REFBd0M7QUFDeEMsNERBQXNDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7SUFDekIsSUFBSSxDQUFDLGNBQVEsRUFBRSxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztZQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUNsRDtJQUNELE1BQU0sU0FBUyxHQUFHLGNBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFFdkUsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1FBQ2xCLHNCQUFzQjtRQUN0QixnQkFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUM1QztTQUFNLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUM5QixhQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELDRCQUE0QjtJQUM1QixPQUFPLGVBQU8sQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELGtCQUFlLEdBQUcsQ0FBQyJ9