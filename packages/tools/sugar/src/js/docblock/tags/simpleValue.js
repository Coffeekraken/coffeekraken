// @ts-nocheck
// @shared
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
     * @namespace           sugar.js.docblock.tags
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJO1FBQ3ZCLElBQ0UsSUFBSTtZQUNKLElBQUksQ0FBQyxLQUFLO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQ3hCO1lBQ0EsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=