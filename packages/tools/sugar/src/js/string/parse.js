"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                  parse
 * @namespace           sugar.js.string
 * @type                                  Function
 * @stable
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILGtCQUFlLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDdkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLElBQUk7UUFDRixPQUFPLFFBQVEsQ0FBQzs7Z0JBRUosS0FBSztLQUNoQixDQUFDLEVBQUUsQ0FBQztLQUNOO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFDIn0=