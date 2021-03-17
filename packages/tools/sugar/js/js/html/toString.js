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
     * @name            toString
     * @namespace           sugar.js.html
     * @type      Function
     * @stable
     *
     * Return the string version of a dom node or the dom node and his children
     *
     * @param    {HTMLElement}    html    The HTMLElement to convert to string
     * @param    {Boolean}    [deep=true]    Include or not his children
     * @return    {String}    The string version of the dom node
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import toString from '@coffeekraken/sugar/js/string/toString'
     * const myDomNode = document.querySelector('.my-dom-node')
     * toString(myDomNode, false) // <div class="my-dom-node"></div>
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function toStringFn(html, deep) {
        if (deep === void 0) { deep = true; }
        if (document !== undefined && document.createElement !== undefined) {
            var cont = document.createElement('div');
            cont.appendChild(html.cloneNode(deep));
            return cont.innerHTML;
        }
        return html;
    }
    exports.default = toStringFn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvaHRtbC90b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBVztRQUFYLHFCQUFBLEVBQUEsV0FBVztRQUNuQyxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDbEUsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==