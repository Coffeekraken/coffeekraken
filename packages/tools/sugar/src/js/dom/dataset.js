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
        define(["require", "exports", "../../shared/string/uncamelize", "../../shared/string/autoCast", "../../shared/string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const uncamelize_1 = __importDefault(require("../../shared/string/uncamelize"));
    const autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    const toString_1 = __importDefault(require("../../shared/string/toString"));
    /**
     * @name      dataset
     * @namespace            js.dom
     * @type      Function
     * @status              wip
     *
     * Get or set a value on the passed element with the passed name
     *
     * @param       {HTMLElement}       $elm         The HTMLElement on which to set to value
     * @param       {String}            key         The key to set the data
     * @param       {Mixed}             [value=null]  The value to set
     * @return      {Mixed}                         Return the value wanted or setted
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import dataset from '@coffeekraken/sugar/js/dom/dataset';
     * dataset(myCoolElement, 'hello', 'world'); // => 'world';
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function dataset($elm, key, value = null) {
        if (!$elm.getAttribute)
            return;
        if (!value) {
            const v = $elm.dataset[key] || $elm.getAttribute('data-' + uncamelize_1.default(key));
            return autoCast_1.default(v);
        }
        else {
            // try to set the value
            const dataset = $elm.dataset;
            if (dataset) {
                $elm.dataset[key] = toString_1.default(value);
            }
            else {
                // set the data through setAttribute
                // cause no support for dataset
                $elm.setAttribute('data-' + uncamelize_1.default(key), toString_1.default(value));
            }
            // return the element
            return $elm;
        }
    }
    exports.default = dataset;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vZGF0YXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxnRkFBMEQ7SUFDMUQsNEVBQXNEO0lBQ3RELDRFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sQ0FBQyxHQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sa0JBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjthQUFNO1lBQ0wsdUJBQXVCO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0IsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLG9DQUFvQztnQkFDcEMsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUNELHFCQUFxQjtZQUNyQixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9