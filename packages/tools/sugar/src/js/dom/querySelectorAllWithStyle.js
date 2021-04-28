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
        define(["require", "exports", "./getStyleProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    /**
     * @name      querySelectorAllWithStyle
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Select all node that match the style object passed as parameter
     *
     * @param    {String}    selector    The css selector to use as base filter
     * @param    {Object}    style    The style that has to match
     * @param    {Object}    [settings={}]    A setting object
     * @return    [Array<HTMLElement>]    An array of HTMLElement that matches the style object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import querySelectorAllWithStyle from '@coffeekraken/sugar/js/dom/querySelectorAllWithStyle'
     * querySelectorAllWithStyle('*', {
     * 	backgroundImage: true
     * })
     *
     * // style object can contains either:
     * const style = {
     * 	 backgroundImage: true, // has to have the background-image style
     *   backgroundPosition: false, // has to not have the background-position style
     *   backgroundSize: /cover|contain/, // has to have the background-size set to cover or contain
     *   background: 'none' // has to have to background set to "none"
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function querySelectorAllWithStyle(selector, style, settings = {}) {
        // extend settings
        settings = Object.assign({ rootNode: document.body }, settings);
        // select all the element from the selector
        const $elms = settings.rootNode.querySelectorAll(selector);
        // check that we have some nodes to process
        if (!$elms.length)
            return [];
        // init the ar$Elms stack that will be returned at the end
        const ar$Elms = [];
        // loop on each elements
        Array.from($elms).forEach(($elm) => {
            // track if the $elm match all the properties
            let match = true;
            // loop on each properties of the style object
            // to check it against the dom computed style
            for (const key in style) {
                // get the value from the computed dom node
                const value = getStyleProperty_1.default($elm, key);
                // true as selector
                if (style[key] === true && !value) {
                    match = false;
                    break;
                }
                else if (style[key] === false && value) {
                    match = false;
                    break;
                }
                else if (style[key] instanceof RegExp &&
                    !value.toString().match(style[key])) {
                    match = false;
                    break;
                }
                else if (typeof style[key] === 'string' && style[key] !== value) {
                    match = false;
                    break;
                }
            }
            // add the dom node in stack if it match all the
            // style object
            if (match) {
                ar$Elms.push($elm);
            }
        });
        // return the elements found
        return ar$Elms;
    }
    /**
     * @name 	settings.rootNode
     * The root node used to select the the elements within
     * @setting
     * @type 		{HTMLElement}
     * @default 	document
     */
    exports.default = querySelectorAllWithStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbFdpdGhTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vcXVlcnlTZWxlY3RvckFsbFdpdGhTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBa0Q7SUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILFNBQVMseUJBQXlCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMvRCxrQkFBa0I7UUFDbEIsUUFBUSxtQkFDTixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNaLENBQUM7UUFDRiwyQ0FBMkM7UUFDM0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDN0IsMERBQTBEO1FBQzFELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQix3QkFBd0I7UUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQyw2Q0FBNkM7WUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLDhDQUE4QztZQUM5Qyw2Q0FBNkM7WUFDN0MsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLDJDQUEyQztnQkFDM0MsTUFBTSxLQUFLLEdBQUcsMEJBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxtQkFBbUI7Z0JBQ25CLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDakMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDZCxNQUFNO2lCQUNQO3FCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUU7b0JBQ3hDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsTUFBTTtpQkFDUDtxQkFBTSxJQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNO29CQUM1QixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ25DO29CQUNBLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsTUFBTTtpQkFDUDtxQkFBTSxJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUNqRSxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNkLE1BQU07aUJBQ1A7YUFDRjtZQUNELGdEQUFnRDtZQUNoRCxlQUFlO1lBQ2YsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsNEJBQTRCO1FBQzVCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBZSx5QkFBeUIsQ0FBQyJ9