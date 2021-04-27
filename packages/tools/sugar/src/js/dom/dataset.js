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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0ZBQTBEO0lBQzFELDRFQUFzRDtJQUN0RCw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLENBQUMsR0FDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RSxPQUFPLGtCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7YUFBTTtZQUNMLHVCQUF1QjtZQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdCLElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxvQ0FBb0M7Z0JBQ3BDLCtCQUErQjtnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDbkU7WUFDRCxxQkFBcUI7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==