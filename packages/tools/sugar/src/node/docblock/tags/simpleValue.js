"use strict";
// @ts-nocheck
// @shared
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
module.exports = simpleValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQUk7SUFDdkIsSUFDRSxJQUFJO1FBQ0osSUFBSSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDeEI7UUFDQSxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3BCLENBQUM7QUFDRCxpQkFBUyxXQUFXLENBQUMifQ==