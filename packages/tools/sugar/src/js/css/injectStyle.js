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
     * @name            injectStyle
     * @namespace            js.css
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
    function injectStyle(style, node = document.head) {
        const $tag = document.createElement('style');
        $tag.type = 'text/css';
        $tag.innerHTML = style;
        node.appendChild($tag);
        return $tag;
    }
    exports.default = injectStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0U3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmplY3RTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSTtRQUM5QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=