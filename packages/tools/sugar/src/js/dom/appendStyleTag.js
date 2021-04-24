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
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Append a style tag either to the head or the body
     *
     * @param    {String}    css    The style css to append
     * @param       {HTMLElement}       [$parent=document.head]            The parent in which you want to append the style tag
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVUYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBlbmRTdHlsZVRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxjQUFjLENBQ3JCLEdBQUcsRUFDSCxPQUFtRTtRQUFuRSx3QkFBQSxFQUFBLFVBQVUsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5FLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ3JCLHNDQUFzQztZQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7U0FDakM7YUFBTTtZQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=