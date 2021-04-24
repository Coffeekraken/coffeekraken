// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name              simpleValue
     * @namespace           shared.tags
     * @type              Function
     * @status              wip
     *
     * Parse the simpleValue tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @return      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function simpleValue(data) {
        if (data &&
            data.value &&
            typeof data.value === 'string' &&
            data.value.trim() === '') {
            return true;
        }
        return data.value;
    }
    exports.default = simpleValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFNBQVMsV0FBVyxDQUFDLElBQUk7UUFDdkIsSUFDRSxJQUFJO1lBQ0osSUFBSSxDQUFDLEtBQUs7WUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDeEI7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==