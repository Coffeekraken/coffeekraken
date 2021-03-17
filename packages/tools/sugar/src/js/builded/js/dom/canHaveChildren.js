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
     * @name          canHaveChildren
     * @namespace     sugar.js.dom
     * @type          Function
     * @stable
     *
     * This function take as input either a tagName String like "img", "div", etc... or an HTMLElement node
     * and return true or false depending if this element is supposed to have children or not.
     *
     * @param       {String|HTMLElement}          element       The element to check. A tagName like "img", or directly a HTMLElement node reference
     * @return      {Boolean}                                   true if the element is supposed to have children, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import canHaveChildren from '@coffeekraken/sugar/js/dom/canHaveChildren';
     * canHaveChildren('img'); // => false
     * canHaveChildren('div'); // => true
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function canHaveChildren(element) {
        if (typeof element === 'string') {
            element = document.createElement(element);
        }
        else if (!(element instanceof HTMLElement)) {
            throw "The element parameter can be either a string or an HTMLElement node reference... You've passed \"" + typeof element + "\"";
        }
        if ('canHaveHTML' in element)
            return element.canHaveHTML;
        var tagName = element.tagName;
        var closeTag = ("</" + tagName + ">").toLowerCase();
        if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
            return true;
        return false;
    }
    exports.default = canHaveChildren;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuSGF2ZUNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL2NhbkhhdmVDaGlsZHJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLGVBQWUsQ0FBQyxPQUFPO1FBQzlCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQyxFQUFFO1lBQzVDLE1BQU0sc0dBQW1HLE9BQU8sT0FBTyxPQUFHLENBQUM7U0FDNUg7UUFDRCxJQUFJLGFBQWEsSUFBSSxPQUFPO1lBQUUsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3pELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDaEMsSUFBTSxRQUFRLEdBQUcsQ0FBQSxPQUFLLE9BQU8sTUFBRyxDQUFBLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1FBQ2QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsZUFBZSxDQUFDIn0=