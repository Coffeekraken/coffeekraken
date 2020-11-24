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
     * @name      stripTags
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Strip the tags of the passed text
     *
     * @param    {String}    html    the html to process
     * @return    {String}    The html without any tags
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import stripTags from '@coffeekraken/sugar/js/dom/stripTags'
     * stripTags('<h1>Hello World</h1>') // => Hello World
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function stripTags(html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    return stripTags;
});
