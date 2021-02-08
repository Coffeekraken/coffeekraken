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
        define(["require", "exports", "sprintf-js"], factory);
    }
})(function (require, exports) {
    "use strict";
    var sprintf_js_1 = __importDefault(require("sprintf-js"));
    /**
     * @name        printf
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * printf php equavalent
     *
     * @param 		{String} 						source 			The source in which to replace the tokens
     * @param 		{Miyed} 			values... 			  Any number of arguments to replace the placeholders in the string
     * @return 	{String} 										The resulting string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import printf from '@coffeekraken/sugar/js/string/printf';
     * printf('Hello %s', 'world'); // => Hello world
     * printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
     * printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
     *
     * @see 				https://www.npmjs.com/package/sprintf-js
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function _printf() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return sprintf_js_1.default.sprintf.apply(null, args);
    }
    return _printf;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJpbnRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLDBEQUFtQztJQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsT0FBTztRQUFDLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O1FBQ3RCLE9BQU8sb0JBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsT0FBUyxPQUFPLENBQUMifQ==