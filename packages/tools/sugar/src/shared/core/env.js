// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/node", "../object/get", "../object/set", "../object/delete", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_1 = __importDefault(require("../is/node"));
    const get_1 = __importDefault(require("../object/get"));
    const set_1 = __importDefault(require("../object/set"));
    const delete_1 = __importDefault(require("../object/delete"));
    const parse_1 = __importDefault(require("../string/parse"));
    /**
     * @name                    env
     * @namespace            js.core
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNEQUFrQztJQUNsQyx3REFBa0M7SUFDbEMsd0RBQWtDO0lBQ2xDLDhEQUF3QztJQUN4Qyw0REFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSztRQUN6QixJQUFJLENBQUMsY0FBUSxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztnQkFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDbEQ7UUFDRCxNQUFNLFNBQVMsR0FBRyxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRXZFLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixzQkFBc0I7WUFDdEIsZ0JBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDOUIsYUFBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsZUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFDRCw0QkFBNEI7UUFDNUIsT0FBTyxlQUFPLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxrQkFBZSxHQUFHLENBQUMifQ==