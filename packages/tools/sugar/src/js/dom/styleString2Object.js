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
        define(["require", "exports", "../string/camelize", "../string/autoCast"], factory);
    }
})(function (require, exports) {
    "use strict";
    var camelize_1 = __importDefault(require("../string/camelize"));
    var autoCast_1 = __importDefault(require("../string/autoCast"));
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
    return styleString2Object;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVTdHJpbmcyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3R5bGVTdHJpbmcyT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0VBQTRDO0lBQzVDLGdFQUE0QztJQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsa0JBQWtCLENBQUMsS0FBSztRQUMvQixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEMsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO1lBQ3RCLHFDQUFxQztZQUNyQyxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUM5QixHQUFHLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQiwwQkFBMEI7WUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCwwQkFBMEI7UUFDMUIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0QsT0FBUyxrQkFBa0IsQ0FBQyJ9