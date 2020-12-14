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
    var sprintf_js_1 = require("sprintf-js");
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
    return sprintf;
});
//# sourceMappingURL=module.js.map