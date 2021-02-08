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
        define(["require", "exports", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var toString_1 = __importDefault(require("../string/toString"));
    /**
     * @name          SValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @status              wip
     *
     * This class represent the base validation class
     * that can be extended to create some validations like the "required" one, etc...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SValidation = /** @class */ (function () {
        function SValidation() {
        }
        /**
         * @name          apply
         * @type          Function
         * @static
         *
         * This static method is the main one when you want to apply a certain
         * validation on your value. Simply call this method and pass your value to validate.
         * By default, if the value does not pass the test, this method will
         * throw an error by using the "message" static property of the
         * validation class. If you don't want that but getting the string message back
         * insteaf, simply pass in the settings object the property "throw" to false
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SValidation.apply = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var checkResult = this.exec.apply(this, args);
            if (checkResult === true)
                return true;
            var message = this.message;
            var finalArgs = Array.isArray(checkResult) ? checkResult : args;
            finalArgs.forEach(function (arg, i) {
                var value = toString_1.default(arg);
                if (Array.isArray(arg)) {
                    value = arg.join(',');
                }
                message = message.replace("%" + i, value);
                // if (__isNode()) {
                //   const packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');
                //   message = message.replace(`${packageRoot(__dirname)}/`, '');
                //   message = message.replace(`${packageRoot()}/`, '');
                // }
            });
            return message;
        };
        return SValidation;
    }());
    return SValidation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUE0QztJQUc1Qzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSDtRQUFBO1FBZ0RBLENBQUM7UUEvQ0M7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSSxpQkFBSyxHQUFaO1lBQWEsY0FBTztpQkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUFQLHlCQUFPOztZQUNsQixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxPQUFULElBQUksRUFBUyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLFdBQVcsS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0IsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixJQUFJLEtBQUssR0FBRyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFJLENBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUMsb0JBQW9CO2dCQUNwQiw4RUFBOEU7Z0JBQzlFLGlFQUFpRTtnQkFDakUsd0RBQXdEO2dCQUN4RCxJQUFJO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBY0gsa0JBQUM7SUFBRCxDQUFDLEFBaERELElBZ0RDO0lBRUQsT0FBUyxXQUFXLENBQUMifQ==