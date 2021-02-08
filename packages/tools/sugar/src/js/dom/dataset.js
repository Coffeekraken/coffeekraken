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
        define(["require", "exports", "../string/uncamelize", "../string/autoCast", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var uncamelize_1 = __importDefault(require("../string/uncamelize"));
    var autoCast_1 = __importDefault(require("../string/autoCast"));
    var toString_1 = __importDefault(require("../string/toString"));
    /**
     * @name      dataset
     * @namespace           sugar.js.dom
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
    function dataset($elm, key, value) {
        if (value === void 0) { value = null; }
        if (!$elm.getAttribute)
            return;
        if (!value) {
            var v = $elm.dataset[key] || $elm.getAttribute('data-' + uncamelize_1.default(key));
            return autoCast_1.default(v);
        }
        else {
            // try to set the value
            var dataset_1 = $elm.dataset;
            if (dataset_1) {
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
    return dataset;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvRUFBZ0Q7SUFDaEQsZ0VBQTRDO0lBQzVDLGdFQUE0QztJQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQVk7UUFBWixzQkFBQSxFQUFBLFlBQVk7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsSUFBTSxDQUFDLEdBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsT0FBTyxrQkFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDTCx1QkFBdUI7WUFDdkIsSUFBTSxTQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QixJQUFJLFNBQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsb0NBQW9DO2dCQUNwQywrQkFBK0I7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ25FO1lBQ0QscUJBQXFCO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ0QsT0FBUyxPQUFPLENBQUMifQ==