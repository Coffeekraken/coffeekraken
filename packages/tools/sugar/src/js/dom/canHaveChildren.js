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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuSGF2ZUNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FuSGF2ZUNoaWxkcmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsZUFBZSxDQUFDLE9BQU87UUFDOUIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDLEVBQUU7WUFDNUMsTUFBTSxzR0FBbUcsT0FBTyxPQUFPLE9BQUcsQ0FBQztTQUM1SDtRQUNELElBQUksYUFBYSxJQUFJLE9BQU87WUFBRSxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDekQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFNLFFBQVEsR0FBRyxDQUFBLE9BQUssT0FBTyxNQUFHLENBQUEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7WUFDakUsT0FBTyxJQUFJLENBQUM7UUFDZCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxlQUFlLENBQUMifQ==