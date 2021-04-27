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
     * @name        strToHtml
     * @namespace            js.html
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
            const cont = document.createElement('div');
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
    exports.default = strToHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyVG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyVG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTTtRQUN2QixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDbEUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==