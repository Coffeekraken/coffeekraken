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
     * @name        strToHtml
     * @namespace           sugar.js.html
     * @type      Function
     * @stable
     *
     * Return the html (dom) version of a string
     *
     * @param    {HTMLElement}    html    The string to convert to dom nodes
     * @return    {HTMLElement}    The dom nodes representation of the passed string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import strToHtml from '@coffeekraken/sugar/js/html/strToHtml'
     * const myString = '<p>Hello World</p>'
     * strToHtml(myString) // <p>Hello World</p>
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function strToHtml(string) {
        if (document !== undefined && document.createElement !== undefined) {
            var cont = document.createElement('div');
            cont.innerHTML = string;
            if (cont.children.length === 1) {
                return cont.children[0];
            }
            else {
                return cont;
            }
        }
        return string;
    }
    return strToHtml;
});
//# sourceMappingURL=module.js.map