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
        define(["require", "exports", "../../shared/string/uncamelize"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uncamelize_1 = __importDefault(require("../../shared/string/uncamelize"));
    /**
     * @name      styleObject2String
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Transform a style object to inline string separated by ;
     *
     * @param 		{Object} 				styleObj 		An object of style to apply
     * @return 		(String) 								The string style representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import styleObject2String from '@coffeekraken/sugar/js/dom/styleObject2String'
     * const styleString = styleObject2String({
     * 		paddingLeft : '20px',
     * 		display : 'block'
     * });
     * // output => padding-left:20px; display:block;
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function styleObject2String(styleObj) {
        // process the style object
        var propertiesArray = [];
        for (var key in styleObj) {
            var value = styleObj[key];
            // if the value is ''
            // mean that we need to get rid of
            if (value === undefined || value === '') {
                delete styleObj[key];
            }
            else {
                propertiesArray.push(uncamelize_1.default(key) + ":" + value + ";");
            }
        }
        // return the css text
        return propertiesArray.join(' ');
    }
    exports.default = styleObject2String;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVPYmplY3QyU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzL2RvbS9zdHlsZU9iamVjdDJTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsOEVBQTBEO0lBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxRQUFRO1FBQ2xDLDJCQUEyQjtRQUMzQixJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDM0IsS0FBSyxJQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDMUIsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLHFCQUFxQjtZQUNyQixrQ0FBa0M7WUFDbEMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLGVBQWUsQ0FBQyxJQUFJLENBQUksb0JBQVksQ0FBQyxHQUFHLENBQUMsU0FBSSxLQUFLLE1BQUcsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0Y7UUFDRCxzQkFBc0I7UUFDdEIsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxrQkFBZSxrQkFBa0IsQ0FBQyJ9