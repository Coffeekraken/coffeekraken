// @ts-nocheck
// @shared
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
    var node_1 = __importDefault(require("../is/node"));
    var get_1 = __importDefault(require("../object/get"));
    var set_1 = __importDefault(require("../object/set"));
    var delete_1 = __importDefault(require("../object/delete"));
    var parse_1 = __importDefault(require("../string/parse"));
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
        var targetObj = node_1.default() ? global.process.env : window.process.env;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb3JlL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsb0RBQWtDO0lBQ2xDLHNEQUFrQztJQUNsQyxzREFBa0M7SUFDbEMsNERBQXdDO0lBQ3hDLDBEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLO1FBQ3pCLElBQUksQ0FBQyxjQUFRLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dCQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNsRDtRQUNELElBQU0sU0FBUyxHQUFHLGNBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFdkUsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLHNCQUFzQjtZQUN0QixnQkFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUM5QixhQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN6RDtRQUNELDRCQUE0QjtRQUM1QixPQUFPLGVBQU8sQ0FBQyxhQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELGtCQUFlLEdBQUcsQ0FBQyJ9