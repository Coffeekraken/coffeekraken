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
     * @name        camelize
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Camelize a string
     *
     * @param         {String}          text        The string to camelize
     * @return        {String}                      The camelized string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import camelize from '@coffeekraken/sugar/js/string/camelize';
     * camelize('hello world'); // => helloWorld
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function camelize(text) {
        var res = '';
        var reg = /(?:^|[_-\s])(\w)/g;
        res = text.replace(reg, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
        res = res.substr(0, 1).toLowerCase() + res.slice(1);
        return res.trim();
    }
    exports.default = camelize;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYW1lbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsUUFBUSxDQUFDLElBQUk7UUFDcEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBTSxHQUFHLEdBQUcsbUJBQW1CLENBQUM7UUFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDcEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9