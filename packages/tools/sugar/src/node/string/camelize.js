"use strict";
// @ts-nocheck
// @shared
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
    let res = '';
    const reg = /(?:^|[_-\s])(\w)/g;
    res = text.replace(reg, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
    res = res.substr(0, 1).toLowerCase() + res.slice(1);
    return res.trim();
}
module.exports = camelize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYW1lbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSTtJQUNwQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixNQUFNLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztJQUNoQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBQ0QsaUJBQVMsUUFBUSxDQUFDIn0=