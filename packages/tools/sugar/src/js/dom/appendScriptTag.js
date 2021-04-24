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
        define(["require", "exports", "./scriptLoaded"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var scriptLoaded_1 = __importDefault(require("./scriptLoaded"));
    /**
     * @name        appendScriptTag
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Append a script tag either to the head or the body
     *
     * @param    {String}    src    The script src to load
     * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag'
     * appendScriptTag('dist/js/app.js')
     *
     * @since     1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function appendScriptTag(src, $parent) {
        if ($parent === void 0) { $parent = document.body; }
        var $script = document.createElement('script');
        $script.src = src;
        $parent.appendChild($script);
        return scriptLoaded_1.default($script);
    }
    exports.default = appendScriptTag;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwZW5kU2NyaXB0VGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsVUFBVSxRQUFRLENBQUMsSUFBSTtRQUNuRCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsT0FBTyxzQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxrQkFBZSxlQUFlLENBQUMifQ==