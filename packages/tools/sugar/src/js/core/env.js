"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = env;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLHNEQUFrQztBQUNsQyx3REFBa0M7QUFDbEMsd0RBQWtDO0FBQ2xDLDhEQUF3QztBQUN4Qyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSztJQUN6QixJQUFJLENBQUMsY0FBUSxFQUFFLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0tBQ2xEO0lBQ0QsTUFBTSxTQUFTLEdBQUcsY0FBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUV2RSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDbEIsc0JBQXNCO1FBQ3RCLGdCQUFRLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQzVDO1NBQU0sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQzlCLGFBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLGVBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsNEJBQTRCO0lBQzVCLE9BQU8sZUFBTyxDQUFDLGFBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsaUJBQVMsR0FBRyxDQUFDIn0=