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
     * @name                                  parse
     * @namespace            js.string
     * @type                                  Function
     * @stable
     *
     * Parse a string and convert it into his native data type like date, number, boolean, etc...
     *
     * @param             {String}                        value                                 The value to convert
     * @return            {Mixed}                                                               The converted value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import parse from '@coffeekraken/sugar/js/string/parse';
     * parse('10'); // => 10
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (value) => {
        if (typeof value !== 'string')
            return value;
        value = value.split('⠀').join('').trim();
        try {
            return Function(`
      "use strict";
      return (${value});
    `)();
        }
        catch (e) {
            return value;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsa0JBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM1QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekMsSUFBSTtZQUNGLE9BQU8sUUFBUSxDQUFDOztnQkFFSixLQUFLO0tBQ2hCLENBQUMsRUFBRSxDQUFDO1NBQ047UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDLENBQUMifQ==