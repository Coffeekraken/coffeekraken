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
     * @name      styleString2Object
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Transform a style string to an object representation
     *
     * @param 		{String} 				style 			The style string
     * @return 		(Object) 								The string object representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import styleString2Object from '@coffeekraken/sugar/js/dom/styleString2Object'
     * const styleString = styleString2Object('padding-left:20px; display:block;');
     * // output => {
     * //		paddingLeft : '20px',
     * // 		display : 'block'
     * // }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function styleString2Object(style) {
        if (!style || style === '')
            return {};
        var obj = {};
        var split = style.replace(/\s/g, '').split(';');
        split.forEach(function (statement) {
            // split statement by key value pairs
            var spl = statement.split(':'), key = camelize_1.default(spl[0]), value = spl[1];
            // add element into object
            obj[key] = autoCast_1.default(value);
        });
        // return the style object
        return obj;
    }
    exports.default = styleString2Object;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVTdHJpbmcyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL3N0eWxlU3RyaW5nMk9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBc0Q7SUFDdEQsMEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxLQUFLO1FBQy9CLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUU7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN0QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDdEIscUNBQXFDO1lBQ3JDLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzlCLEdBQUcsR0FBRyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QixLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLDBCQUEwQjtZQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILDBCQUEwQjtRQUMxQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxrQkFBZSxrQkFBa0IsQ0FBQyJ9