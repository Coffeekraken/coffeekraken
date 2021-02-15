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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = dataset;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0VBQWdEO0lBQ2hELGdFQUE0QztJQUM1QyxnRUFBNEM7SUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFZO1FBQVosc0JBQUEsRUFBQSxZQUFZO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQU0sQ0FBQyxHQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sa0JBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjthQUFNO1lBQ0wsdUJBQXVCO1lBQ3ZCLElBQU0sU0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0IsSUFBSSxTQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLG9DQUFvQztnQkFDcEMsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUNELHFCQUFxQjtZQUNyQixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9