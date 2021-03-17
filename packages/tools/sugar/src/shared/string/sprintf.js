// @ts-nocheck
// @shared
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const sprintf_js_1 = require("sprintf-js");
    /**
     * @name        sprintf
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Javascript implementation of the sprintf php function.
     * >For more infos, check [this github repository](https://github.com/alexei/sprintf.js)
     *
     * @param    {String}    format    The format of the string wanted as output
     * @param    {Mixed}    ...replacements    The replacement tokens to apply to the string
     * @return    {String}    The processed string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import sprintf from '@coffeekraken/sugar/js/string/sprintf'
     * sprintf('Hello %s', 'world') // Hello World
     * const user = { name: 'Dolly' }
     * sprintf('Hello %(name)s', user) // Hello Dolly
     *
     * @see    https://github.com/alexei/sprintf.js
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function sprintf() {
        return sprintf_js_1.sprintf.apply(this, arguments);
    }
    exports.default = sprintf;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaW50Zi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwcmludGYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWLDJDQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDSCxTQUFTLE9BQU87UUFDZCxPQUFPLG9CQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=