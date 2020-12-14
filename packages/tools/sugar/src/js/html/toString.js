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
    return toStringFn;
});
//# sourceMappingURL=module.js.map