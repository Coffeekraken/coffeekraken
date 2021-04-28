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
    const camelize_1 = __importDefault(require("../../shared/string/camelize"));
    const autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    /**
     * @name      styleString2Object
     * @namespace            js.dom
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
        const obj = {};
        const split = style.replace(/\s/g, '').split(';');
        split.forEach((statement) => {
            // split statement by key value pairs
            const spl = statement.split(':'), key = camelize_1.default(spl[0]), value = spl[1];
            // add element into object
            obj[key] = autoCast_1.default(value);
        });
        // return the style object
        return obj;
    }
    exports.default = styleString2Object;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVTdHJpbmcyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9zdHlsZVN0cmluZzJPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEVBQXNEO0lBQ3RELDRFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsa0JBQWtCLENBQUMsS0FBSztRQUMvQixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMxQixxQ0FBcUM7WUFDckMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDOUIsR0FBRyxHQUFHLGtCQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3hCLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsMEJBQTBCO1lBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsMEJBQTBCO1FBQzFCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLGtCQUFrQixDQUFDIn0=