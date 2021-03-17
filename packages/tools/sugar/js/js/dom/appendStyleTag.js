// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name        appendStyleTag
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Append a style tag either to the head or the body
     *
     * @param    {String}    css    The style css to append
     * @param       {HTMLElement}       [$parent=document.head]            The parent in which you want to append the style tag
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import appendStyleTag from '@coffeekraken/sugar/js/dom/appendStyleTag'
     * appendStyleTag('dist/js/app.js')
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function appendStyleTag(css, $parent) {
        if ($parent === void 0) { $parent = document.head || document.getElementsByTagName('head')[0]; }
        var $style = document.createElement('style');
        if ($style.styleSheet) {
            // This is required for IE8 and below.
            $style.styleSheet.cssText = css;
        }
        else {
            $style.appendChild(document.createTextNode(css));
        }
        $parent.appendChild($style);
    }
    exports.default = appendStyleTag;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVUYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL2FwcGVuZFN0eWxlVGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLGNBQWMsQ0FDckIsR0FBRyxFQUNILE9BQW1FO1FBQW5FLHdCQUFBLEVBQUEsVUFBVSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkUsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDckIsc0NBQXNDO1lBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUNqQzthQUFNO1lBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxrQkFBZSxjQUFjLENBQUMifQ==