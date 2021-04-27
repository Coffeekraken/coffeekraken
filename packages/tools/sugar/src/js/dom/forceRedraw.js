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
     * @name      forceRedraw
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Force the element to be painted again in case of visual issues
     *
     * @param    {HTMLElement}    $elm    The HTMLElement to force the redraw on
     * @return    {HTMLElement}    The HTMLElement to maintain chainability
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import forceRedraw from '@coffeekraken/sugar/js/dom/forceRedraw'
     * forceRedraw($elm)
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function forceRedraw($elm) {
        const display = getStyleProperty_1.default($elm, 'display');
        $elm.style.display = 'none';
        $elm.offsetHeight;
        $elm.style.display = display;
        return $elm;
    }
    exports.default = forceRedraw;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yY2VSZWRyYXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JjZVJlZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBb0Q7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDdkIsTUFBTSxPQUFPLEdBQUcsMEJBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==