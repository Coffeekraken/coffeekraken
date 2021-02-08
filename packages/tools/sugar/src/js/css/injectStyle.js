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
    /**
     * @name            injectStyle
     * @namespace           sugar.js.css
     * @type            Function
     * @status              wip
     *
     * Inject a passed style string in the DOM
     *
     * @param         {String}          style         The style to inject in DOM
     * @param         {HTMLElement}     [node=document.head]    The node in which to inject the new style tag
     * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
     *
     * @todo        interface
     * @todo        doc
     *
     * @example       js
     * import injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
     * injectStyle('a { color: red; }');
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function injectStyle(style, node) {
        if (node === void 0) { node = document.head; }
        var $tag = document.createElement('style');
        $tag.type = 'text/css';
        $tag.innerHTML = style;
        node.appendChild($tag);
        return $tag;
    }
    return injectStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0U3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmplY3RTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBb0I7UUFBcEIscUJBQUEsRUFBQSxPQUFPLFFBQVEsQ0FBQyxJQUFJO1FBQzlDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFTLFdBQVcsQ0FBQyJ9