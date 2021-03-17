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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuSGF2ZUNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzL2RvbS9jYW5IYXZlQ2hpbGRyZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxlQUFlLENBQUMsT0FBTztRQUM5QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsRUFBRTtZQUM1QyxNQUFNLHNHQUFtRyxPQUFPLE9BQU8sT0FBRyxDQUFDO1NBQzVIO1FBQ0QsSUFBSSxhQUFhLElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN6RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQU0sUUFBUSxHQUFHLENBQUEsT0FBSyxPQUFPLE1BQUcsQ0FBQSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtZQUNqRSxPQUFPLElBQUksQ0FBQztRQUNkLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLGVBQWUsQ0FBQyJ9