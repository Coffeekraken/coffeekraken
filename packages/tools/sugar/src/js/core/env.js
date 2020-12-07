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
    var node_1 = __importDefault(require("../is/node"));
    var get_1 = __importDefault(require("../object/get"));
    var set_1 = __importDefault(require("../object/set"));
    var delete_1 = __importDefault(require("../object/delete"));
    var parse_1 = __importDefault(require("../string/parse"));
    /**
     * @name                    env
     * @namespace           sugar.js.core
     * @type                    Function
     * @wip
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
    return env;
});
//# sourceMappingURL=env.js.map