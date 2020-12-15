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
     * @wip
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
//# sourceMappingURL=dataset.js.map