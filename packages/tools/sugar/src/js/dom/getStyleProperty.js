// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/string/camelize", "../../shared/string/autoCast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var camelize_1 = __importDefault(require("../../shared/string/camelize"));
    var autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    /**
     * @name      getStyleProperty
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Get a style property on the passed element through the computed style.
     * This function try to store the actual style to not trigger more that 1 redraw
     * each js execution loop.
     *
     * @param 		{HTMLElement} 					elm  		The element to get style from
     * @param 		{String} 						property 	The css property to get
     * @return 		{Mixed} 									The style value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
     * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
     *
     * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getStyleProperty(elm, property) {
        // caching mecanisme
        setTimeout(function () {
            elm._sComputedStyle = null;
        });
        var computed = elm._sComputedStyle || window.getComputedStyle(elm);
        elm._sComputedStyle = computed;
        var prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var value = computed[camelize_1.default("" + prefix + property)];
            if (value && value.trim() !== '')
                return autoCast_1.default(value);
        }
        return null;
    }
    exports.default = getStyleProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3R5bGVQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFN0eWxlUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMEVBQW9EO0lBQ3BELDBFQUFvRDtJQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFFBQVE7UUFDckMsb0JBQW9CO1FBQ3BCLFVBQVUsQ0FBQztZQUNULEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckUsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFFL0IsSUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsa0JBQVEsQ0FBQyxLQUFHLE1BQU0sR0FBRyxRQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO2dCQUFFLE9BQU8sa0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=