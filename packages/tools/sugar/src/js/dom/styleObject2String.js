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
    const uncamelize_1 = __importDefault(require("../../shared/string/uncamelize"));
    /**
     * @name      styleObject2String
     * @namespace            js.dom
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
        const propertiesArray = [];
        for (const key in styleObj) {
            const value = styleObj[key];
            // if the value is ''
            // mean that we need to get rid of
            if (value === undefined || value === '') {
                delete styleObj[key];
            }
            else {
                propertiesArray.push(`${uncamelize_1.default(key)}:${value};`);
            }
        }
        // return the css text
        return propertiesArray.join(' ');
    }
    exports.default = styleObject2String;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVPYmplY3QyU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3R5bGVPYmplY3QyU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdGQUEwRDtJQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsa0JBQWtCLENBQUMsUUFBUTtRQUNsQywyQkFBMkI7UUFDM0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFO1lBQzFCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixxQkFBcUI7WUFDckIsa0NBQWtDO1lBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUN2QyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0Y7UUFDRCxzQkFBc0I7UUFDdEIsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxrQkFBZSxrQkFBa0IsQ0FBQyJ9