// @ts-nocheck
/**
 * @name                                  parse
 * @namespace            js.string
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        beta
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
export default (value) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3JCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxJQUFJO1FBQ0EsT0FBTyxRQUFRLENBQUM7O2dCQUVSLEtBQUs7S0FDaEIsQ0FBQyxFQUFFLENBQUM7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDLENBQUMifQ==