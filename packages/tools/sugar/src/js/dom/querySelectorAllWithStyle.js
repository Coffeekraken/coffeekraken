// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
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
    function querySelectorAllWithStyle(selector, style, settings) {
        if (settings === void 0) { settings = {}; }
        // extend settings
        settings = __assign({ rootNode: document.body }, settings);
        // select all the element from the selector
        var $elms = settings.rootNode.querySelectorAll(selector);
        // check that we have some nodes to process
        if (!$elms.length)
            return [];
        // init the ar$Elms stack that will be returned at the end
        var ar$Elms = [];
        // loop on each elements
        Array.from($elms).forEach(function ($elm) {
            // track if the $elm match all the properties
            var match = true;
            // loop on each properties of the style object
            // to check it against the dom computed style
            for (var key in style) {
                // get the value from the computed dom node
                var value = getStyleProperty_1.default($elm, key);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbFdpdGhTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3JBbGxXaXRoU3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBa0Q7SUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILFNBQVMseUJBQXlCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQy9ELGtCQUFrQjtRQUNsQixRQUFRLGNBQ04sUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDWixDQUFDO1FBQ0YsMkNBQTJDO1FBQzNDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzdCLDBEQUEwRDtRQUMxRCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsd0JBQXdCO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUM3Qiw2Q0FBNkM7WUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLDhDQUE4QztZQUM5Qyw2Q0FBNkM7WUFDN0MsS0FBSyxJQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLDJDQUEyQztnQkFDM0MsSUFBTSxLQUFLLEdBQUcsMEJBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxtQkFBbUI7Z0JBQ25CLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDakMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDZCxNQUFNO2lCQUNQO3FCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUU7b0JBQ3hDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsTUFBTTtpQkFDUDtxQkFBTSxJQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNO29CQUM1QixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ25DO29CQUNBLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsTUFBTTtpQkFDUDtxQkFBTSxJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUNqRSxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNkLE1BQU07aUJBQ1A7YUFDRjtZQUNELGdEQUFnRDtZQUNoRCxlQUFlO1lBQ2YsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsNEJBQTRCO1FBQzVCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBZSx5QkFBeUIsQ0FBQyJ9